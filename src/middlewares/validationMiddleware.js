import ResponseHandler from "../utils/responseHandler.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return ResponseHandler.badRequest(res,error.message)
  }

  req.body = value;
  next();
};

