import Joi from "@hapi/joi";

const createSquadSchema = Joi.object({
  squadName: Joi.string().required().label("Squad Name"),
  squadDescription: Joi.string().required().label("Squad Description"),
});

export default createSquadSchema;
