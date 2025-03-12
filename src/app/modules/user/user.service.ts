/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";
import JobSeeker from "../jobSeeker/jobSeeker.model";
import { IUser } from "../jobSeeker/jobSeeker.interface";
import { User } from "./user.model";
import Recruiter from "../recruiter/recruiter.model";
import { Admin } from "../admin/admin.model";

const createJobSeekerIntoDB = async (payload: IUser & { name: string }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isUserExists = await User.findOne({ email: payload.email }).session(
      session,
    );

    if (isUserExists) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "This email is Already Exists!!!",
      );
    }

    const isJobSeekerExists = await JobSeeker.findOne({
      email: payload.email,
    }).session(session);

    if (isJobSeekerExists) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "This email is Already Exists in the job seeker account!!!",
      );
    }

    const newUser = await User.create([payload], { session });

    if (!newUser?.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create job seeker account",
      );
    }

    const newJobSeekerData = {
      user: newUser[0]._id,
      email: newUser[0].email,
      name: payload.name,
    };

    const newJobSeeker = await JobSeeker.create([newJobSeekerData], {
      session,
    });

    if (!newJobSeeker?.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create job seeker account",
      );
    }

    await session.commitTransaction();
    session.endSession();

    return newJobSeeker[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const createRecruiterIntoDB = async (payload: IUser & { name: string }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isUserExists = await User.findOne({ email: payload.email }).session(
      session,
    );

    if (isUserExists) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "This email is Already Exists!!!",
      );
    }

    const isRecruiterExists = await Recruiter.findOne({
      email: payload.email,
    }).session(session);

    if (isRecruiterExists) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "This email is Already Exists in the Recruiter account!!!",
      );
    }

    const newUser = await User.create([payload], { session });

    if (!newUser?.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create Recuiter account",
      );
    }

    const newRecruiterData = {
      user: newUser[0]._id,
      email: newUser[0].email,
      name: payload.name,
    };

    const newRecruiter = await Recruiter.create([newRecruiterData], {
      session,
    });

    if (!newRecruiter?.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create recuiter account",
      );
    }

    await session.commitTransaction();
    session.endSession();

    return newRecruiter[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (payload: IUser & { name: string }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isUserExists = await User.findOne({ email: payload.email }).session(
      session,
    );

    if (isUserExists) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "This email is Already Exists!!!",
      );
    }

    const isAdminExists = await Admin.findOne({
      email: payload.email,
    }).session(session);

    if (isAdminExists) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "This email is Already Exists in the Admin account!!!",
      );
    }

    const newUser = await User.create([payload], { session });

    if (!newUser?.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create Admin account",
      );
    }

    const newAdminData = {
      user: newUser[0]._id,
      email: newUser[0].email,
      name: payload.name,
    };

    const newAdmin = await Admin.create([newAdminData], {
      session,
    });

    if (!newAdmin?.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create admin account",
      );
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createJobSeekerIntoDB,
  createRecruiterIntoDB,
  createAdminIntoDB,
};
