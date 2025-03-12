import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../middlewares/sendResponse";
import { RecruiterServices } from "./recruiter.service";

const updateRecuiter = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { adminData } = req.body;
  const result = await RecruiterServices.updateRecuiterIntoDB(id, adminData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recruiter Updated Successfully",
    data: result,
  });
});

const getAllRecuiter = catchAsync(async (req, res) => {
  const result = await RecruiterServices.getAllRecuiterFromDB(req.query);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recruiter Retrieved Successfully",
    data: result.allRecuiter,
    meta: result.meta,
  });
});

const getSingleRecuiter = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RecruiterServices.getRecuiterFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recruiter Retrieved Successfully",
    data: result,
  });
});

const hardDeleteRecuiter = catchAsync(async (req, res) => {
  const { id } = req.params;
  await RecruiterServices.hardRecuiterFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recruiter Deleted Successfully",
    data: null,
  });
});

export const RecuiterController = {
  updateRecuiter,
  getAllRecuiter,
  getSingleRecuiter,
  hardDeleteRecuiter,
};
