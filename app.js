const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./users/users.route");
const itemRouter = require("./route/items");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/items", itemRouter);

app.listen(port, () => {
  console.log(`Server is live and listening on http://localhost:${port}`);
});
