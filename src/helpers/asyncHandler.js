import { ZodError } from "zod";
import { failureResponse, validationErrorResponse } from "./responseHandler.js";

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log("Is ZodError:", error instanceof ZodError);
      console.log("Error name:", error.constructor.name);
      console.log("Error:", error);

      if (error instanceof ZodError) {
        return validationErrorResponse(res, error);
      }
      return failureResponse(res, error.message, null, error.statusCode)
    });
  };
};
