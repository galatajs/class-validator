import { ValidationError, ValidatorOptions } from "class-validator";
import { Newable } from "../types/types";

export interface ValidateHooks {
  beforeValidate?: (Schema: Newable<any>, value: any) => void | Promise<void>;
  afterValidate?: (
    Schema: Newable<any>,
    value: any,
    errors: ValidationError[]
  ) => void | Promise<void>;
}

export interface ValidateOptions extends ValidateHooks, ValidatorOptions {}

export type ValidateResult = {
  success: boolean;
  errors: ValidationError[];
};
