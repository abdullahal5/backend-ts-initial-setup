import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import { Admin } from "./admin.model";
import { IAdminProfile } from "./admin.interface";

const updateAdminIntoDB = async (id: string, body: Partial<IAdminProfile>) => {
  const findAdmin = await Admin.findOne({ _id: id }).select("-password");

  if (!findAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
  }

  const checkUserStatus = await User.findOne({ _id: findAdmin.user });

  if (!checkUserStatus) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await Admin.findByIdAndUpdate(id, body, {
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

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(Admin.find(), query)
    .search(["firstName", "lastName", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await result.countTotal();
  const allAdmin = await result.modelQuery.populate("user").exec();

  return { meta, allAdmin };
};

const getAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id).populate("user");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, `Admin not found`);
  }
  return result;
};

const hardAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdminOrManager =
      await Admin.findByIdAndDelete(id).session(session);

    if (!deletedAdminOrManager) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Admin");
    }

    const userId = deletedAdminOrManager.user;

    const deletedUser = await User.findByIdAndDelete(userId).session(session);

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Admin");
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

export const AdminServices = {
  updateAdminIntoDB,
  getAllAdminFromDB,
  getAdminFromDB,
  hardAdminFromDB,
};
