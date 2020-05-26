module.exports = async (req, res, next) => {
  req.context = { models };
  next();
};
