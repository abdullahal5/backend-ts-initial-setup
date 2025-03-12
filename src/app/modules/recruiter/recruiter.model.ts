import mongoose, { Schema } from "mongoose";
import {
  TContactDetails,
  TWorkExperience,
  TEducation,
  TProfileDetails,
} from "../../types";
import { IRecruiter } from "./recruiter.interface";

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

const workExperienceSchema = new Schema<TWorkExperience>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
  },
  { _id: false },
);

const educationSchema = new Schema<TEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  { _id: false },
);

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

const recruiterSchema = new Schema<IRecruiter>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
    contactDetails: {
      type: contactDetailsSchema,
      required: false,
    },
    workExperience: [
      {
        type: workExperienceSchema,
      },
    ],
    education: [
      {
        type: educationSchema,
      },
    ],
    isActive: { type: Boolean, default: true },
    profileDetails: {
      type: profileDetailsSchema,
      required: false,
    },
  },
  { timestamps: true },
);

const Recruiter = mongoose.model<IRecruiter>(
  "Recruiter",
  recruiterSchema,
);

export default Recruiter;
