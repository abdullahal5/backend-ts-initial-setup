import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./User.validation";
import { UserControllers } from "./user.controller";
const router = express.Router();

router.post(
  "/create-jobSeeker",
  validateRequest(UserValidation.userZodSchema),
  UserControllers.createJobSeeker,
);

router.post(
  "/create-recruiter",
  validateRequest(UserValidation.userZodSchema),
  UserControllers.createRecruiter,
);

router.post(
  "/create-admin",
  validateRequest(UserValidation.userZodSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
