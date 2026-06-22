export const validate = (schemas) => (req, res, next) => {
  //   console.log("test");
  if (schemas.body) {
    req.body = schemas.body.parse(req.body);
  }
  if (schemas.params) {
    req.params = schemas.params.parse(req.params);
  }
  next();
};
