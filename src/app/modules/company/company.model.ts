import { Schema, model, Types } from "mongoose";
import { ICompany } from "./company.interface";

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    foundedIn: { type: Number, required: false },
    description: { type: String, default: null },
    shortBio: { type: String, default: null },
    specialties: { type: [String], default: [] },
    benefitsAndPerks: { type: [String], default: [] },
    focus: { type: String, default: null },
    industryType: { type: String, default: null },
    companySize: {
      type: String,
      enum: ["Startup", "Medium", "Large", "Enterprise"],
      default: "Startup",
    },
    jobPosts: { type: [Types.ObjectId], ref: "JobPost", required: false },
    contactDetails: {
      phone: { type: String, default: null },
      email: { type: String, default: null },
      website: { type: String, default: null },
      address: { type: String, default: null },
    },
    location: { type: String, default: null },
    socialLinks: {
      facebook: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
      instagram: { type: String, default: null },
    },
    logo: { type: String, default: null },
    coverImage: { type: String, default: null },
    openingPositions: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Company = model<ICompany>("Company", companySchema);

export default Company;
