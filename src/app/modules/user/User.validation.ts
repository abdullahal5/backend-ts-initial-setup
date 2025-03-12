import { z } from "zod";

export const userZodSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required")
      .trim()
      .toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["admin", "jobSeeker", "recruiter"]).default("jobSeeker"),
    status: z.enum(["Active", "Blocked"]).default("Active"),
    isDeleted: z.boolean().default(false),
    passwordChangedAt: z.date().nullable().default(null),
  }),
});

export const UserValidation = {
  userZodSchema,
};