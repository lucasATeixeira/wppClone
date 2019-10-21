const express = require("express");
const UserController = require("./controllers/UserController");
const ConversationController = require("./controllers/ConversationController");

const routes = express.Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.get("/conversations", ConversationController.index);
routes.get("/users/:receiver_id/conversations", ConversationController.show);
routes.post("/users/:receiver_id/conversations", ConversationController.store);
routes.put("/conversations/:id", ConversationController.update);
routes.delete("/conversations/:id", ConversationController.destroy);

module.exports = routes;
