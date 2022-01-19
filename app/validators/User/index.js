const Joi = require("joi");
const createError = require("http-errors");

async function validateNewUser(data, res) {
  try {
    const schema = Joi.object().keys({
      firstname: Joi.string().alphanum().min(3).max(15).required(),
      lastname: Joi.string().alphanum().min(3).max(15).required(),
      username: Joi.string().alphanum().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cnic: Joi.number().integer().min(13).required(),
      passport: Joi.number().integer(),
      mobile: Joi.number().integer().min(11).required(),
    });
    console.log(data);

    const dataToValidate = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      cnic: data.cnic,
      mobile: data.mobile_no,
      passport: data.passport,
    };

    const result = schema.validate(dataToValidate);

    if (result.error) {
      console.log(result.error);
      res.status(401).send({ message: "Data is not in valid form" });
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

async function validateAdmin(data, res) {
  try {
    const schema = Joi.object().keys({
      firstname: Joi.string().alphanum().min(3).max(15).required(),
      lastname: Joi.string().alphanum().min(3).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    });

    const dataToValidate = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    const result = schema.validate(dataToValidate);

    if (result.error) {
      res.status(401).send({ message: "Data is not valid" });
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  validateNewUser,
  validateAdmin,
};
