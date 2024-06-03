// user.routes.js

import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar, getUserForSearch } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserForSearch);
router.get("/usersForSidebar", protectRoute, getUserForSidebar);

export default router;
