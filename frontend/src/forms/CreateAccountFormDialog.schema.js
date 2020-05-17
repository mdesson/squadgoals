import Joi from '@hapi/joi';

const createAccountSchema = Joi.object({
	firstName: Joi.string().required().label('First Name'),
	lastName: Joi.string().required().label('Last Name'),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required()
		.label('Email'),
	aspirationalMessage: Joi.string().required().label('Aspirational Message'),
});

export default createAccountSchema;
