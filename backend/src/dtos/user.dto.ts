import Joi, { ref } from "joi";

// signup dto
export const UserSignUpDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please add an Email",
    "string.email": "Not a Valid Email",
  }),
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),

  ConfirmPassword: Joi.equal(ref("Password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// signin dto
export const UserSignInDto = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Please add an Email",
    "string.email": "Not a Valid Email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please add a Password",
  }),
});

// reset password dto
export const UserPasswordResetDto = Joi.object({
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  ConfirmPassword: Joi.equal(ref("Password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user dto
export const UserUpdateDto = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    "string.empty": "Please add an Email",
    "string.email": "Not a Valid Email",
  }),
});

// update user password dto
export const UserUpdatePasswordDto = Joi.object({
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  ConfirmPassword: Joi.equal(ref("Password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user profile dto
export const UserUpdateProfileDto = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    "string.empty": "Please add an Email",
    "string.email": "Not a Valid Email",
  }),
  Password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  ConfirmPassword: Joi.equal(ref("Password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
});
