import express from "express";
import { registerUser } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { getUser } from "../controllers/users/getUser.js";
import { getSingleUser } from "../controllers/users/getSingleUser.js";
import { updateUser } from "../controllers/users/updateUser.js";
import { deleteUser } from "./../controllers/users/deleteUser.js";
import { authorizeUser, checkRole } from "../middleware/auth.js";

// configure exress route
const router = express.Router();

// defining endpoints from routes
router.post("/register-user", registerUser);
router.post("/login", login);
router.get("/all-users", authorizeUser, checkRole("admin"), getUsers);
router.get("/get-user", authorizeUser, checkRole("admin"), getUser);
router.get(
  "/user-details/:id",
  authorizeUser,
  checkRole("admin"),
  getSingleUser
);
router.patch(
  "/update-profile/:id",
  authorizeUser,
  checkRole("admin", "regular"),
  updateUser
);
router.delete(
  "/delete-user/:id",
  authorizeUser,
  checkRole("admin"),
  deleteUser
);

export default router;


