import { Response, Request, NextFunction } from "express";

class ServerError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const errorHandler: Function = (
  err: Error | unknown,
  res: Response,
  _req: Request,
  _next: NextFunction,
): void => {
  if (err instanceof ServerError) {
    const status: number = err.status;
    const message: string = err.message;

    console.log(`${err.status} |> ${err.message}`);

    res.status(status).json({
      status: status,
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

  res.status(500).json({
    status: 500,
    message: "An error occured",
  });
};

export default errorHandler;
