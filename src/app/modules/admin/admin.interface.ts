import { Types } from "mongoose";
import { TContactDetails, TProfileDetails } from "../../types";

export interface IAdminProfile {
  name?: string;
  email: string;
  user?: Types.ObjectId;
  role?: string;
  contactDetails?: TContactDetails;
  profileDetails?: TProfileDetails;
  isActive?: boolean;
}
