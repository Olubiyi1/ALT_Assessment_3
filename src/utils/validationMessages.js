export const validationMessages = {
  name: {
    "any.required": "Please enter a name",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name cannot exceed 50 characters",
  },

  email: {
    "any.required": "Please enter an email",
    "string.empty": "Email cannot be empty",
    "string.email": "Please enter a valid email address",
  },

  password: {
    "any.required": "Please enter a password",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password cannot exceed 30 characters",
    "string.pattern.base":
      "Password must include uppercase, lowercase, number, and special character",
  },

  title: {
    "any.required": "Please enter a task title",
    "string.empty": "Task title cannot be empty",
    "string.min": "Task title must be at least 3 characters long",
    "string.max": "Task title cannot exceed 100 characters",
  },

  description: {
    "string.empty": "Description cannot be empty",
    "string.max": "Description cannot exceed 300 characters",
  },
};

