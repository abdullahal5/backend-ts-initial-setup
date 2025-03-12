import express from "express";
import { RecuiterController } from "./recruiter.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateRecruiterValidationSchema } from "./recruiter.validation";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";

const router = express.Router();

router.get(
  "/get-all",
  auth(User_Role.admin),
  RecuiterController.getAllRecuiter,
);

router.get("/get-single/:id", RecuiterController.getSingleRecuiter);

router.put(
  "/update/:id",
  auth(User_Role.admin, User_Role.recruiter),
  validateRequest(updateRecruiterValidationSchema),
  RecuiterController.updateRecuiter,
);
router.delete(
  "/delete/:id",
  auth(User_Role.admin),
  RecuiterController.hardDeleteRecuiter,
);

export const RecuiterRoutes = router;
