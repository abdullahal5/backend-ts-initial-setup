import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { IUser } from "./user.interce";

type JwtpayloadData = {
  userId: mongoose.Types.ObjectId | undefined;
  username?: string | undefined;
  email: string | undefined;
  role: string | undefined;
  gender?: string | undefined;
  status: string | undefined;
  profileImage?: string | undefined;
};

export const createToken = (
  jwtPayload: JwtpayloadData,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const createJwtPayload = (user: IUser): JwtpayloadData => {
  return {
    userId: user?._id,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};
