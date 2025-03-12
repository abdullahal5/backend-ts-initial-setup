import mongoose from "mongoose";
import { IJobPost } from "./jobPost.interface";

const jobPostSchema = new mongoose.Schema<IJobPost>(
  {
    jobPostName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    stipend: {
      type: String,
      required: true,
    },
    jobSector: {
      type: String,
      required: true,
    },
    jobType: {
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
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    openings: {
      type: Number,
      required: true,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    perks: {
      type: [String],
      required: true,
    },
    applicationProcess: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const JobPost = mongoose.model<IJobPost>("JobPost", jobPostSchema);

export default JobPost;
