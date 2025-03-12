import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";
import { AdminController } from "./admin.controller";
import { updateAdminProfileValidationSchema } from "./admin.validation";

const router = express.Router();

router.get(
  "/get-all",
  auth(User_Role.admin),
  AdminController.getAllAdmin,
);

router.get("/get-single/:id", AdminController.getSingleAdmin);

router.put(
  "/update/:id",
  auth(User_Role.admin),
  validateRequest(updateAdminProfileValidationSchema),
  AdminController.updateAdmin,
);
router.delete(
  "/delete/:id",
  auth(User_Role.admin),
  AdminController.hardDeleteAdmin,
);

export const AdminRoutes = router;
