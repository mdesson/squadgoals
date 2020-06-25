import Joi from "@hapi/joi";

const createAccountSchema = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  password: Joi.string().required().label("Password"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  aspirationalMessage: Joi.string().required().label("Aspirational Message"),
});

export default createAccountSchema;
