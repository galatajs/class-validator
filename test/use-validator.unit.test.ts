import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { useValidator } from "../lib";

class BasicSchema {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

describe("useValidator Unit Testing", () => {
  it("should return success if valid", async () => {
    const result = await useValidator(BasicSchema, {
      email: "",
      password: "",
    });
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(2);
  });

  it("should return success with valid payload", async () => {
    const result = await useValidator(BasicSchema, {
      email: "abc@abc.com",
      password: "abc",
    });
    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
