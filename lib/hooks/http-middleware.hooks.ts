import { Request, Response, NextFunction, Middleware } from "@istanbul/http";
import { ValidationError } from "class-validator";
import { Newable } from "../types/types";
import { ValidateOptions, ValidateResult } from "./hook.types";
import { validationMessages } from "./message.hooks";
import { useValidator } from "./validate.hooks";

export const validateRequest = (
  Schema: Newable<any>,
  options?: ValidateOptions
): Middleware => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const result: ValidateResult = await useValidator(
      Schema,
      req.body,
      options
    );
    if (result.success) return next();
    res.errorData<ValidationError[]>(
      validationMessages.httpErrorMessage,
      result.errors
    );
  };
};
