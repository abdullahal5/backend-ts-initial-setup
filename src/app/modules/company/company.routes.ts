import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CompanyController } from "./company.controller";
import { companyValidaton } from "./company.validation";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";
const router = express.Router();

router.post(
  "/create",
  validateRequest(companyValidaton.CompanyCreateValidationSchema),
  auth(User_Role.recruiter, User_Role.admin),
  CompanyController.createCompany,
);

router.get(
  "/get-all",
  auth(User_Role.recruiter, User_Role.admin, User_Role.jobSeeker),
  CompanyController.getAllCompanies,
);

router.get(
  "/get-single/:id",
  auth(User_Role.recruiter, User_Role.admin, User_Role.jobSeeker),
  CompanyController.getCompanyById,
);

router.put(
  "/update/:id",
  auth(User_Role.recruiter, User_Role.admin),
  validateRequest(companyValidaton.CompanyUpdateValidationSchema),
  CompanyController.updateCompany,
);

router.delete(
  "/delete/:id",
  auth(User_Role.recruiter, User_Role.admin),
  CompanyController.deleteCompany,
);

export const CompanyRoutes = router;
