import httpStatus from "http-status";
import Recipe from "../../models/recipe/recipe.js"; // adjust path as needed

export const getRecipesWithUserDetails = async (req, res) => { 
try { 
const result = await Recipe.aggregate([ 
{ 
$lookup: { 
from: "users", 
localField: "userId", 
foreignField: "_id", 
as: "creator", 
}, 
}, 
{ $unwind: "$creator" }, // flatten the array 
{ 
$project: { 
title: 1, 
ingredients: 1, 
status: 1, 
createdAt: 1, 
"creator.name": 1, 
"creator.email": 1, 
}, 
}, 
]); 
res.status(httpStatus.OK).json({ status: "Success", data: 
result }); 
} catch (err) { 
res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: 
"Error", message: err.message }); 
} 
}; 
