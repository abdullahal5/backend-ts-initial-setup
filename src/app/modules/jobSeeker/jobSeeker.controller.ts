import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../middlewares/sendResponse";
import { JobSeekerServices } from "./jobSeeker.service";

const updateJobSeeker = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { adminData } = req.body;
  const result = await JobSeekerServices.updateJobSeekerIntoDB(id, adminData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "JobSeeker Updated Successfully",
    data: result,
  });
});

const getAllJobSeeker = catchAsync(async (req, res) => {
  const result = await JobSeekerServices.getAllJobSeekerFromDB(req.query);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "JobSeeker Retrieved Successfully",
    data: result.allJobSeeker,
    meta: result.meta,
  });
});

const getSingleJobSeeker = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await JobSeekerServices.getJobSeekerFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "JobSeeker Retrieved Successfully",
    data: result,
  });
});

const hardDeleteJobSeeker = catchAsync(async (req, res) => {
  const { id } = req.params;
  await JobSeekerServices.hardJobSeekerFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "JobSeeker Deleted Successfully",
    data: null,
  });
});

export const JobSeekerController = {
  updateJobSeeker,
  getAllJobSeeker,
  getSingleJobSeeker,
  hardDeleteJobSeeker,
};
