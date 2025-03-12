import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../middlewares/sendResponse";
import { UserServices } from "./user.service";

const createJobSeeker = catchAsync(async (req, res) => {
  const user = await UserServices.createJobSeekerIntoDB(req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Created Successfully",
    data: user,
  });
});

const createRecruiter = catchAsync(async (req, res) => {
  const user = await UserServices.createRecruiterIntoDB(req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Created Successfully",
    data: user,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const user = await UserServices.createAdminIntoDB(req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Created Successfully",
    data: user,
  });
});


export const UserControllers = {
  createJobSeeker,
  createRecruiter,
  createAdmin,
};
