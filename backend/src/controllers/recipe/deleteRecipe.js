import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status";

//function to delete a recipe
export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    
    try {
        const recipe = await Recipe.findByIdAndDelete(id);
    
        if (!recipe) {
        return res.status(httpStatus.NOT_FOUND).json({
            status: "FAIL",
            message: "Recipe not found",
        });
        }
    
        return res.status(httpStatus.OK).json({
        status: "SUCCESS",
        message: "Recipe deleted successfully",
        });
    
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: "ERROR",
        message: error.message || "An error occurred while deleting the recipe",
        });
    }
    };