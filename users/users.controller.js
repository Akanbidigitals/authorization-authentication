const fs = require("fs");

const createuser = (req, res) => {
  const userData = fs.readFileSync("./db/users.json");
  const userDB = JSON.parse(userData);

  const newUser = req.body;
  newUser.api_key = `${newUser.username}_${newUser.password}`;

  if (newUser.username === "akanbi" || newUser.username === "mubarak") {
    newUser.user_type = "admin";
  } else {
    newUser.user_type = "user";
  }

  userDB.push(newUser);

  console.log(newUser);

  fs.writeFile("./db/users.json", JSON.stringify(userDB), (err) => {
    if (err) {
      res.status(500).json({
        message: "internal server error",
      });
    }
    res.status(200).json(newUser);
  });
};

module.exports = { createuser };
