/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICompany } from "./company.interface";
import Company from "./company.model";

const createCompany = async (companyData: Partial<ICompany>) => {
  try {
    const newCompany = new Company(companyData);
    await newCompany.save();
    return newCompany;
  } catch (error) {
    throw new Error("Failed to create company");
  }
};

const getAllCompanies = async () => {
  try {
    const companies = await Company.find();
    return companies;
  } catch (error) {
    throw new Error("Failed to fetch companies");
  }
};

const getCompanyById = async (companyId: string) => {
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }
    return company;
  } catch (error) {
    throw new Error("Failed to fetch company details");
  }
};

const updateCompany = async (
  companyId: string,
  companyData: {
    name?: string;
    description?: string;
    location?: string;
    industry?: string;
    website?: string;
  },
) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      companyData,
      { new: true },
    );
    if (!updatedCompany) {
      throw new Error("Company not found");
    }
    return updatedCompany;
  } catch (error) {
    throw new Error("Failed to update company");
  }
};

const deleteCompany = async (companyId: string) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      throw new Error("Company not found");
    }
    return deletedCompany;
  } catch (error) {
    throw new Error("Failed to delete company");
  }
};

export const CompanyServices = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
