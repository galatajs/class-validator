import {
  Request,
  Response,
  NextFunction,
  InternalMiddleware,
  Socket,
} from "@galatajs/ws";
import { ValidationError } from "class-validator";
import { Newable } from "../types/types";
import { ValidateOptions, ValidateResult } from "./hook.types";
import { validationMessages } from "./message.hooks";
import { useValidator } from "./validate.hooks";

export const validateListener = (
  Schema: Newable<any>,
  options?: ValidateOptions
): InternalMiddleware => {
  return async (
    socket: Socket,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const result: ValidateResult = await useValidator(
      Schema,
      req.body.body,
      options
    );
    if (result.success) return next();
    res.errorData<ValidationError[]>(
      validationMessages.wsErrorMessage,
      result.errors
    );
  };
};
