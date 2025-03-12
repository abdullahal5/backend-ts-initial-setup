import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../middlewares/sendResponse";
import { AdminServices } from "./admin.service";

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { adminData } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, adminData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin Updated Successfully",
    data: result,
  });
});

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin Retrieved Successfully",
    data: result.allAdmin,
    meta: result.meta,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getAdminFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin Retrieved Successfully",
    data: result,
  });
});

const hardDeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.hardAdminFromDB(id);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin Deleted Successfully",
    data: null,
  });
});

export const AdminController = {
  updateAdmin,
  getAllAdmin,
  getSingleAdmin,
  hardDeleteAdmin,
};
