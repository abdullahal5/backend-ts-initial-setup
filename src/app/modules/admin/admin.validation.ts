import { Types } from "mongoose";
import { z } from "zod";

export const contactDetailsSchema = z.object({
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const profileDetailsSchema = z.object({
  bio: z.string().optional(),
  profileImage: z.string().optional(),
  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      portfolio: z.string().optional(),
    })
    .optional(),
});

export const updateAdminProfileValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  user: z.instanceof(Types.ObjectId).optional(),
  role: z.string().optional(),
  contactDetails: contactDetailsSchema.optional(),
  profileDetails: profileDetailsSchema.optional(),
  isActive: z.boolean().optional(),
});
