import Joi from "joi";
import validationMessages from "../../utils/validationMessages";

class UserValidationSchema {
  static createUserValidation = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .required()
      .messages({
        "any.required": validationMessages.name["any.required"],
        "string.empty": validationMessages.name["string.empty"],
        "string.min": validationMessages.name["string.min"],
        "string.max": validationMessages.name["string.max"]
      }),

    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "any.required": validationMessages.email["any.required"],
        "string.empty": validationMessages.email["string.empty"],
        "string.email": validationMessages.email["string.email"]
      }),

    password: Joi.string()
  .min(8)
  .max(30)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?-])/)
  .required()
  .messages({
    "any.required": validationMessages.password["any.required"] || "Please enter a password",
    "string.empty": validationMessages.password["string.empty"] || "Password cannot be empty",
    "string.min": validationMessages.password["string.min"] || "Password must be at least 8 characters long",
    "string.max": validationMessages.password["string.max"] || "Password cannot exceed 30 characters",
    "string.pattern.base":
      validationMessages.password["string.pattern.base"] ||
      "Password must include uppercase, lowercase, number, and special character"
  })

  });
}

export default UserValidationSchema;
