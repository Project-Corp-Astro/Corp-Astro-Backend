import Joi from "joi";

// Validation schema for user registration
export const validateRegister = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "astrologer", "end-user").optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

// Validation schema for user login
export const validateLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data, { abortEarly: false });
};