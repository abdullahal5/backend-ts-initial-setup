import { Types } from "mongoose";

export interface ICompany {
  name?: string;
  author?: Types.ObjectId;
  foundedIn?: Date;
  description?: string;
  shortBio?: string;
  specialties?: string[];
  benefitsAndPerks?: string[];
  focus?: string;
  industryType?: string;
  companySize?: string;
  jobPosts: Types.ObjectId[];
  contactDetails?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  location?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  logo?: string;
  coverImage?: string;
  openingPositions?: number;
  isApproved?: boolean;
}
