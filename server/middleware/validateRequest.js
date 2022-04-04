const errorHandler = require("../utils/errorHandler");

module.exports.register = (schema) => async(req,res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch(error) {
    errorHandler(res, error)
  }
};