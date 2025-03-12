import { Types } from "mongoose";
import {
  TContactDetails,
  TEducation,
  TProfileDetails,
  TWorkExperience,
} from "../../types";

export interface IRecruiter {
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  user: Types.ObjectId;
  posts?: Types.ObjectId[];
  company: Types.ObjectId[];
  contactDetails?: TContactDetails;
  workExperience?: TWorkExperience[];
  education?: TEducation[];
  isActive?: boolean;
  profileDetails?: TProfileDetails;
}
