import { JwtPayload } from "jsonwebtoken";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const User_Role = {
  admin: "admin",
  jobSeeker: "jobSeeker",
  recruiter: "recruiter",
} as const;

export type TUserRole = keyof typeof User_Role;