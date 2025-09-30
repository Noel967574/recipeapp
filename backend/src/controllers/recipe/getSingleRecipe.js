import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status";

export async function getSingleRecipe(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT FOUND",
        message: "Please provide a valid id",
      });
    }
    let recipe;
    recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT FOUD",
        message: "No Recipe Found!",
      });
    } else {
      return res.status(httpStatus.OK).json({
        status: "Success",
        message: "Recipe retrieved Successfully!",
        recipeDetails: recipe,
      });
    }
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: e.message,
    });
  }
}
