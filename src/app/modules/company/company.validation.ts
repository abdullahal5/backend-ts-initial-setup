import { z } from "zod";

const CompanyCreateValidationSchema = z.object({
  name: z.string({ required_error: "Company name is required" }),
  author: z.string({ required_error: "Author is required" }),
  foundedIn: z.date().optional(),
  description: z.string().optional(),
  shortBio: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  benefitsAndPerks: z.array(z.string()).optional(),
  focus: z.string().optional(),
  industryType: z.string().optional(),
  companySize: z.string().optional(),
  jobPosts: z.array(z.string()).optional(),
  contactDetails: z
    .object({
      phone: z.string().optional(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      address: z.string().optional(),
    })
    .optional(),
  location: z.string().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  openingPositions: z.number().optional(),
  isActive: z.boolean().default(true),
});

const CompanyUpdateValidationSchema = z.object({
  name: z.string().optional(),
  author: z.string().optional(),
  foundedIn: z.date().optional(),
  description: z.string().optional(),
  shortBio: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  benefitsAndPerks: z.array(z.string()).optional(),
  focus: z.string().optional(),
  industryType: z.string().optional(),
  companySize: z.string().optional(),
  jobPosts: z.array(z.string()).optional(),
  contactDetails: z
    .object({
      phone: z.string().optional(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      address: z.string().optional(),
    })
    .optional(),
  location: z.string().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  openingPositions: z.number().optional(),
  isActive: z.boolean().default(true),
});

export const companyValidaton = {
  CompanyCreateValidationSchema,
  CompanyUpdateValidationSchema,
};

