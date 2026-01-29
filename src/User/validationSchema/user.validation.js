import Joi from "joi";
import {validationMessages} from "../../utils/validationMessages.js";

class UserValidationSchema {
  static createUserValidation = Joi.object({

    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .required()
      .messages(validationMessages.email),

    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?-]).+$/,
      )
      .required()
      .messages(validationMessages.password),
  });

  static userLoginValidation = Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .required()
      .messages(validationMessages.email),

    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?-]).+$/,
      )
      .required()
      .messages(validationMessages.password),
  });
}

export default UserValidationSchema;
