import { validate } from "class-validator";
import { Newable } from "../types/types";
import { ValidateOptions, ValidateResult } from "./hook.types";

export const useValidator = async (
  Schema: Newable<any>,
  value: any,
  options?: ValidateOptions
): Promise<ValidateResult> => {
  const schema = new Schema();
  if (typeof value === "object") {
    for (const [key, val] of Object.entries(value)) {
      schema[key] = val;
    }
  } else {
    schema["value"] = value;
  }
  if (options) {
    if (options.beforeValidate) {
      await options.beforeValidate(schema, value);
    }
  }
  const result = await validate(schema);
  if (options) {
    if (options.afterValidate) {
      await options.afterValidate(schema, value, result);
    }
  }
  return { success: result.length === 0, errors: result };
};
