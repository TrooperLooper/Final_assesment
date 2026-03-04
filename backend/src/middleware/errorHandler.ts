import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Unhandled error", {
    message: err.message,
    status: err.status || 500,
    stack: err.stack,
    method: req.method,
    path: req.path,
    url: req.originalUrl,
  });

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    status: err.status || 500,
  });
};
