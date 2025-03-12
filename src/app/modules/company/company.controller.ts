import SendResponse from "../../middlewares/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { CompanyServices } from "./company.service";

const createCompany = catchAsync(async (req, res) => {
  const { name, description, location } = req.body;

  const newCompany = await CompanyServices.createCompany({
    name,
    description,
    location,
  });

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Company created successfully",
    data: newCompany,
  });
});

const getAllCompanies = catchAsync(async (req, res) => {
  const companies = await CompanyServices.getAllCompanies();

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Companies retrieved successfully",
    data: companies,
  });
});

const getCompanyById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const company = await CompanyServices.getCompanyById(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Company details retrieved successfully",
    data: company,
  });
});

const updateCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description, location, industry, website } = req.body;

  const updatedCompany = await CompanyServices.updateCompany(id, {
    name,
    description,
    location,
    industry,
    website,
  });

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Company updated successfully",
    data: updatedCompany,
  });
});

const deleteCompany = catchAsync(async (req, res) => {
  const { id } = req.params;

  await CompanyServices.deleteCompany(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Company deleted successfully",
    data: null,
  });
});

export const CompanyController = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
