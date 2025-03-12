import { Model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: "admin" | "jobSeeker" | "recruiter";
  status: "Active" | "Blocked";
  isDeleted: boolean;
  passwordChangedAt?: Date;
  lastLoginAt?: Date;
}

export interface ILoginInfo {
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  isUserExistsByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(
    planeTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}