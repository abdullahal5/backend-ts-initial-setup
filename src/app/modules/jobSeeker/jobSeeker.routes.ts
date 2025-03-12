import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";
import { updateJobSeekerValidationSchema } from "./jobseeker.validation";
import { JobSeekerController } from "./jobSeeker.controller";

const router = express.Router();

router.get(
  "/get-all",
  auth(User_Role.admin),
  JobSeekerController.getAllJobSeeker,
);

router.get("/get-single/:id", JobSeekerController.getSingleJobSeeker);

router.put(
  "/update/:id",
  auth(User_Role.admin, User_Role.recruiter),
  validateRequest(updateJobSeekerValidationSchema),
  JobSeekerController.updateJobSeeker,
);
router.delete(
  "/delete/:id",
  auth(User_Role.admin),
  JobSeekerController.hardDeleteJobSeeker,
);

export const JobSeekerRoutes = router;
