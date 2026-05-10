import type { Response, Request, NextFunction } from "express";

import { ServerError } from "../global/types.ts";

const errorHandler = (
  err: unknown,
  res: Response,
  _req: Request,
  _next: NextFunction,
): Response => {
  if (err instanceof ServerError) {
    const statusCode: number = err.statusCode;
    const message: string = err.message;

    console.log(`${err.statusCode} |> ${err.message}`);

    res.status(statusCode).json({
      status: statusCode,
      message: message,
    });
  }

  if (err instanceof Error) {
    const message: string = err.message;

    console.log(`Error |> ${err.message}`);

    res.status(500).json({
      status: 500,
      message: message,
    });
  }

  console.log("Error |> An error occured");

  return res.status(500).json({
    status: 500,
    message: "An error occured",
  });
};

export default errorHandler;
