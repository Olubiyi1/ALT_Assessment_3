import Joi from "joi";
import { validationMessages } from "../utils/validationMessages.js";

class TaskValidationSchema{
    // create task status
    static createTaskValidationSchema = Joi.object({
        title:Joi.string().trim().required().min(3).max(100).messages(validationMessages.title),
        description:Joi.string().optional().min(5).max(100).messages(validationMessages.description),
        status:Joi.string().valid("pending","completed","deleted").optional().messages(validationMessages.status),
        user:Joi.string().length(24).hex().required().messages(validationMessages.user)
    })

    // Update Task Status
  static updateTaskStatusValidation = Joi.object({
    status: Joi.string()
      .valid("pending", "completed", "deleted")
      .required()
      .messages(validationMessages.status),
  });
}
export default TaskValidationSchema;