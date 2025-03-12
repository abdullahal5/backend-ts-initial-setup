import { z } from "zod";

const skillSchema = z.object({
  name: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
});

const contactDetailsSchema = z.object({
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

const workExperienceSchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  description: z.string().optional(),
});

const educationSchema = z.object({
  institution: z.string().optional(),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
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

const certificationSchema = z.object({
  title: z.string().optional(),
  issuer: z.string().optional(),
  issueDate: z.string().optional(),
  expirationDate: z.string().optional(),
});

const achievementSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
});

const languageSchema = z.object({
  name: z.string().optional(),
  proficiency: z
    .enum(["beginner", "intermediate", "advanced", "native"])
    .optional(),
});

const projectSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  role: z.string().optional(),
  duration: z.string().optional(),
  linkLink: z.string().url().optional(),
  githubLink: z.string().url().optional(),
});

export const updateJobSeekerValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format"),
  user: z.string().optional(),
  jobApplied: z.array(z.string()).optional(),
  favJobPost: z.array(z.string()).optional(),
  role: z.string().optional(),
  contactDetails: contactDetailsSchema.optional(),
  skills: z.array(skillSchema).optional(),
  workExperience: z.array(workExperienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  availability: z.enum(["immediately", "1-2 weeks", "1-3 months"]).optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  preferredJobType: z
    .enum([
      "full-time",
      "part-time",
      "contract",
      "internship",
      "remote",
      "hybrid",
      "on-site",
    ])
    .optional(),
  desiredSalary: z.number().optional(),
  isActive: z.boolean().optional(),
  profileDetails: profileDetailsSchema.optional(),
  certifications: z.array(certificationSchema).optional(),
  achievements: z.array(achievementSchema).optional(),
  language: z.array(languageSchema).optional(),
  project: z.array(projectSchema).optional(),
});
