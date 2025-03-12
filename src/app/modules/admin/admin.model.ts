import { model, Schema, Types } from "mongoose";
import { IAdminProfile } from "./admin.interface";
import { TContactDetails, TProfileDetails } from "../../types";

const profileDetailsSchema = new Schema<TProfileDetails>(
  {
    bio: { type: String },
    profileImage: { type: String },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
      portfolio: { type: String },
    },
  },
  { _id: false },
);

const contactDetailsSchema = new Schema<TContactDetails>(
  {
    phoneNumber: { type: String },
    location: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  { _id: false },
);

const adminProfileSchema = new Schema<IAdminProfile>(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
    contactDetails: {
      type: contactDetailsSchema,
      required: false,
    },
    profileDetails: {
      type: profileDetailsSchema,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model<IAdminProfile>(
  "Admin",
  adminProfileSchema,
);
