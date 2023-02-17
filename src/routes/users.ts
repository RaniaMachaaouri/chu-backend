import express from "express";
import controller from "../controllers/clients";
import userController from "../controllers/userController";
const router = express.Router();

router.get("/users", controller.getClients);
router.get("/users/:userId", controller.getClient);
router.post("/user", controller.addClient);
router.patch("/users/:userId", controller.UpdateClient);
router.delete("/users/:userId", controller.deleteClient);

// Assign user to room
router.post("/user/room", controller.assignClient);

//login and register routes
router.post("/register", userController.register);
router.post("/login", userController.login);

export = router;
