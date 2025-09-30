import express from "express";
import { createRecipe } from "../controllers/recipe/createRecipe.js";
import { getSingleRecipe } from "../controllers/recipe/getSingleRecipe.js";
import { getRecipes } from "../controllers/recipe/getAllRecipes.js";
import { deleteRecipe } from "../controllers/recipe/deleteRecipe.js"; 
import upload from "../middleware/upload.js";

const router = express.Router();

// ✅ Recipe endpoints
router.post("/create-recipe", upload.single("image"), createRecipe);
router.get("/recipe-details/:id", getSingleRecipe); // get single recipe by ID
router.get("/all-recipes", getRecipes);             // get all recipes
router.delete("/delete-recipe/:id", deleteRecipe);  // delete recipe by ID

export default router;
