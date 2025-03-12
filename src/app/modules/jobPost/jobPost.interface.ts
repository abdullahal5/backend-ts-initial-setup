import { Types } from "mongoose";

export interface IJobPost {
  jobPostName: string;
  location: string;
  stipend: string;
  jobSector: string;
  jobType:
    | "full-time"
    | "part-time"
    | "contract"
    | "internship"
    | "remote"
    | "hybrid"
    | "on-site";
  author: Types.ObjectId;
  company: Types.ObjectId;
  description: string;
  skills: string[];
  openings: number;
  responsibilities: string[];
  experience: string;
  qualifications: string[];
  perks: string[];
  applicationProcess: string;
  deadline: Date;
}
