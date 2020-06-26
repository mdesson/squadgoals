import { concat, get, has, includes, set } from "lodash";

function parseJoiError(result) {
  const err = result.error;
  let errors = {};
  let messages = [];
  if (err) {
    err.details.forEach((error) => {
      let errorMsg = error.message;
      if (includes(errorMsg, "ref:")) {
        const errorMatched = errorMsg.match(/ref:(\w+)/);
        if (errorMatched && errorMatched.length > 1) {
          errorMsg = `Must be equal to ${errorMatched[1]}`;
        }
      }
      const errMessageArray = has(errors, error.path) ? concat(get(errors, error.path), errorMsg) : [errorMsg];
      set(errors, error.path, errMessageArray);
      messages.push(errorMsg);
    });
  }

  return {
    errors,
    messages,
  };
}

function ValidationService(
  values,
  schema,
  options = {
    allowUnknown: true,
    abortEarly: false,
    errors: { wrapArrays: false, wrap: { label: "", array: "" } },
  }
) {
  const result = schema.validate(values, options);
  return parseJoiError(result);
}

export default ValidationService;
