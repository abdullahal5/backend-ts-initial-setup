import mongoose, { Schema } from "mongoose";
import { IUser } from "./jobSeeker.interface";

const JobSeekerSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobApplied: [{ type: Schema.Types.ObjectId, ref: "JobPost" }],
    favJobPost: [{ type: Schema.Types.ObjectId, ref: "JobPost" }],
    contactDetails: {
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
    skills: [
      {
        name: { type: String },
        level: { type: String, enum: ["beginner", "intermediate", "advanced"] },
      },
    ],
    workExperience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        responsibilities: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    availability: {
      type: String,
      enum: ["immediately", "1-2 weeks", "1-3 months"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    preferredJobType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "contract",
        "internship",
        "remote",
        "hybrid",
        "on-site",
      ],
    },
    desiredSalary: { type: Number },
    isActive: { type: Boolean, default: true },
    profileDetails: {
      summary: { type: String },
      linkedIn: { type: String },
      portfolio: { type: String },
    },
    certifications: [
      {
        title: { type: String },
        issuer: { type: String },
        issueDate: { type: Date },
        expirationDate: { type: Date },
      },
    ],
    achievements: [
      {
        title: { type: String },
        description: { type: String },
        date: { type: Date },
      },
    ],
    language: [
      {
        name: { type: String },
        proficiency: {
          type: String,
          enum: ["beginner", "intermediate", "advanced", "native"],
        },
      },
    ],
    project: [
      {
        title: { type: String },
        description: { type: String },
        technologies: [{ type: String }],
        role: { type: String },
        duration: { type: String },
        liveLink: { type: String },
        githubLink: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const JobSeeker = mongoose.model<IUser>("JobSeeker", JobSeekerSchema);

export default JobSeeker;
