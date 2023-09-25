const fs = require("fs");

////post-items////

const postItems = (req, res) => {
  const itemsDB = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDB);

  const itemsToPost = req.body;

  const lastId = items[items.length - 1].id;
  const newID = lastId + 1;

  const postWithId = { ...itemsToPost, id: newID };

  items.push(postWithId);

  fs.writeFileSync("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(postWithId);
  });
};

/////===Read file ===////

const getAllItems = (req, res) => {
  const items = fs.readFileSync("./db/items.json");
  return res.status(200).send(items);
};

///=== read one file ===////

const getOneItem = (req, res) => {
  const itemsDB = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDB);

  const id = req.params.id;

  const findIndex = items.find((item) => item.id === parseInt(id));
  if (!findIndex) {
    res.status(404).send("items not found");
  }
  res.json(findIndex);
};

//=== update item with id ===//
const updateItem = (req, res) => {
  const itemsDB = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDB);

  const id = req.params.id;
  const itemUpdate = req.body;

  const findindex = items.findIndex((item) => item.id == parseInt(id));
  if (findindex == -1) {
    res.send(404).send("No such item");
  }
  items[findindex] = itemUpdate;

  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(401);
    }
    res.status(200).send(itemUpdate);
  });
};

//Delete items///

const deleteItems = (req, res) => {
  const itemsDB = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDB);

  const id = req.params.id;

  const item = items.findIndex((items) => items.id === parseInt(id));
  if (item === -1) {
    res.status(404).send("Item not found");
  }
  items.splice(item, 1);
  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(404);
    }
    res.json({ message: "items deleted successfully" });
    res.status(200).send(items);
  });
};

module.exports = {
  postItems,
  getAllItems,
  getOneItem,
  updateItem,
  deleteItems,
};
