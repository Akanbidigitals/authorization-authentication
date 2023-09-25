const fs = require("fs");

const check_apikey = (req, res, next) => {
  const userData = fs.readFileSync("./db/users.json");
  const userDB = JSON.parse(userData);

  const api_key = req.headers.api_key;
  if (!api_key) {
  return  res.status(401).json({
      message: "you are not authenticated, api key is required",
    });
  }
  const foundUser = userDB.find((user) => user.api_key == api_key);
  if (!foundUser) {
   return res.status(401).json({
      message: "you are not authenticated",
    });
  }
  next();
};

const checkAdmin = (req, res, next) => {
  const userData = fs.readFileSync("./db/users.json");
  const userDB = JSON.parse(userData);

  const api_key = req.headers.api_key;

  const foundUser = userDB.find((user) => user.api_key === api_key);
  if (foundUser.user_type !== "admin") {
   return res.status(403).json({
      message: "you are not authorized to access this file",
    });
  }
  next();
};

module.exports = {
  checkAdmin,
  check_apikey,
};
