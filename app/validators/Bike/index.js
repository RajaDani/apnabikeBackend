const Joi = require("joi");
const createError = require("http-errors");

async function validateAddBike(data, res) {
  console.log("data in validation =>", data);
  try {
    const schema = Joi.object().keys({
      company: Joi.string().required(),
      category: Joi.string().required(),
      model: Joi.number().required(),
      chasis_no: Joi.number().required(),
      image: Joi.string().required(),
      status: Joi.number().required(),
      city: Joi.string(),
    });

    const dataToValidate = {
      company: data.company,
      category: data.category,
      model: data.model,
      chasis_no: data.chasis_no,
      image: data.image,
      status: data.status,
      city: data.city,
    };

    const result = schema.validate(dataToValidate);

    if (result.error) {
      console.log(result.error);
      let err = createError.NotAcceptable();
      res.send(err);
    } else {
      console.log("After validataion : " + result);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  validateAddBike,
};
