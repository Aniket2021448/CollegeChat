import express  from "express";
import {sendMessage} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import {getMessage} from "../controllers/message.controller.js";

const router = express.Router();

// protect this route before running this route, if that user 
// is in our app. and currently logged in as well, 
// only then forward the request to sendMessage route
// else not
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);

export default router;