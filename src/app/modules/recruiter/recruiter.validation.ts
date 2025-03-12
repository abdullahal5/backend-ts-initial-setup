import { z } from "zod";

const contactDetailsSchema = z.object({
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

const workExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required").optional(),
  position: z.string().min(1, "Position is required").optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  description: z.string().min(1, "Description is required").optional(),
});

const educationSchema = z.object({
  institution: z.string().min(1, "Institution name is required").optional(),
  degree: z.string().min(1, "Degree is required").optional(),
  fieldOfStudy: z.string().min(1, "Field of study is required").optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
});

const profileDetailsSchema = z.object({
  bio: z.string().optional(),
  profileImage: z.string().optional(),
  socialLinks: z
    .object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      portfolio: z.string().url().optional(),
    })
    .optional(),
});

export const updateRecruiterValidationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  user: z.string().min(1, "User ID is required").optional(),
  posts: z.array(z.string()).optional(),
  company: z.array(z.string()).optional(),
  contactDetails: contactDetailsSchema.optional(),
  workExperience: z.array(workExperienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  isActive: z.boolean().default(true).optional(),
  profileDetails: profileDetailsSchema.optional(),
});
