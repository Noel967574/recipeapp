import express from "express";
import { getUserCountByRole } from "../controllers/anaylitics/anaylitics.js";
import { getUserStats } from "../controllers/anaylitics/userStats.js";
import { authorizeUser, checkRole } from "../middleware/auth.js";

import { getRecipesWithUserDetails } from "../controllers/anaylitics/getRecipeWithUsers.js";

const router = express.Router();


// Anyone logged in can see recipes (you can restrict to admin if needed)
router.get(
  "/with-user-details",
  authorizeUser,
  getRecipesWithUserDetails
);
router.get(
  "/user-role-count",
  authorizeUser,
  checkRole("admin"),
  getUserCountByRole
);

router.get(
  "/user-stats",
  authorizeUser,
  checkRole("admin"),
  getUserStats
);

export default router;


