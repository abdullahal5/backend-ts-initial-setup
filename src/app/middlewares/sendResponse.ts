import { Response } from "express";

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
  meta?: TMeta;
};

const SendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    data: data.data,
    meta: data.meta,
  });
};

export default SendResponse;
