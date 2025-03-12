import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import JobSeeker from "./jobSeeker.model";
import { IJobSeeker } from "./jobSeeker.interface";

const updateJobSeekerIntoDB = async (id: string, body: Partial<IJobSeeker>) => {
  const findJobSeeker = await JobSeeker.findOne({ _id: id }).select(
    "-password",
  );

  if (!findJobSeeker) {
    throw new AppError(httpStatus.NOT_FOUND, "JobSeeker not found");
  }

  const checkUserStatus = await User.findOne({ _id: findJobSeeker.user });

  if (!checkUserStatus) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await JobSeeker.findByIdAndUpdate(id, body, {
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

const getAllJobSeekerFromDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(JobSeeker.find(), query)
    .search(["firstName", "lastName", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await result.countTotal();
  const allJobSeeker = await result.modelQuery.populate("user").exec();

  return { meta, allJobSeeker };
};

const getJobSeekerFromDB = async (id: string) => {
  const result = await JobSeeker.findById(id).populate("user");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, `JobSeeker not found`);
  }
  return result;
};

const hardJobSeekerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdminOrManager =
      await JobSeeker.findByIdAndDelete(id).session(session);

    if (!deletedAdminOrManager) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete JobSeeker");
    }

    const userId = deletedAdminOrManager.user;

    const deletedUser = await User.findByIdAndDelete(userId).session(session);

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete JobSeeker");
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

export const JobSeekerServices = {
  updateJobSeekerIntoDB,
  getAllJobSeekerFromDB,
  getJobSeekerFromDB,
  hardJobSeekerFromDB,
};
