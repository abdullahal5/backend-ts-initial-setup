import { Types } from "mongoose";
import {
  TContactDetails,
  TEducation,
  TProfileDetails,
  TWorkExperience,
} from "../../types";

export type TSkill = {
  name?: string;
  level?: "beginner" | "intermediate" | "advanced";
};

export interface IJobSeeker {
  name?: string;
  email: string;
  user?: Types.ObjectId;
  jobApplied?: Types.ObjectId[];
  favJobPost?: Types.ObjectId[];
  role?: string;
  contactDetails?: TContactDetails;
  skills?: TSkill[];
  workExperience?: TWorkExperience[];
  education?: TEducation[];
  availability?: "immediately" | "1-2 weeks" | "1-3 months";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  preferredJobType?:
    | "full-time"
    | "part-time"
    | "contract"
    | "internship"
    | "remote"
    | "hybrid"
    | "on-site";
  desiredSalary?: number;
  isActive?: boolean;
  profileDetails?: TProfileDetails;
  certifications?: {
    title: string;
    issuer: string;
    issueDate?: string;
    expirationDate?: string;
  }[];

  achievements?: {
    title?: string;
    description?: string;
    date?: string;
  }[];

  language?: {
    name?: string;
    proficiency?: "beginner" | "intermediate" | "advanced" | "native";
  }[];

  project?: {
    title?: string;
    description?: string;
    technologies?: string[];
    role?: string;
    duration?: string;
    linkLink?: string;
    githubLink?: string;
  }[];
}
