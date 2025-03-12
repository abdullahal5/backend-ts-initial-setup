import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import mongoose from "mongoose";
import { IRecruiter } from "./recruiter.interface";
import Recruiter from "./recruiter.model";
import { User } from "../user/user.model";

const updateRecuiterIntoDB = async (id: string, body: Partial<IRecruiter>) => {
  const findRecuiter = await Recruiter.findOne({ _id: id }).select("-password");

  if (!findRecuiter) {
    throw new AppError(httpStatus.NOT_FOUND, "Recuiter not found");
  }

  const checkUserStatus = await User.findOne({ _id: findRecuiter.user });

  if (!checkUserStatus) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await Recruiter.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${checkUserStatus?.role} not found`,
    );
  }

  if (body.role) {
    await User.findByIdAndUpdate(
      checkUserStatus._id,
      { role: body.role },
      { new: true, runValidators: true },
    );
  }

  return result;
};

const getAllRecuiterFromDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(Recruiter.find(), query)
    .search(["firstName", "lastName", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await result.countTotal();
  const allRecuiter = await result.modelQuery.populate("user").exec();

  return { meta, allRecuiter };
};

const getRecuiterFromDB = async (id: string) => {
  const result = await Recruiter.findById(id).populate("user");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, `Recuiter not found`);
  }
  return result;
};

const hardRecuiterFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdminOrManager =
      await Recruiter.findByIdAndDelete(id).session(session);

    if (!deletedAdminOrManager) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Recuiter");
    }

    const userId = deletedAdminOrManager.user;

    const deletedUser = await User.findByIdAndDelete(userId).session(session);

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Recruiter");
    }

    await session.commitTransaction();
    return deletedAdminOrManager;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const RecruiterServices = {
  updateRecuiterIntoDB,
  getAllRecuiterFromDB,
  getRecuiterFromDB,
  hardRecuiterFromDB,
};
