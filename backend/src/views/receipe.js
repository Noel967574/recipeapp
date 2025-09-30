// turn this     import mongoose from "mongoose";

// export const dbConnection = () => {
//   const conn = mongoose.connect(process.env.MONGO_URI);
//   return conn;
// };  import User from "../../models/users/user.js";
// import { loginSchema } from "../../validators/authValidator.js";
// import bcrypt from "bcrypt";
// import httpStatus from "http-status";
// import { jwtToken } from "../../utils/generateToken.js";

// const login = async (req, res) => {
//   try {
//     // ✅ validate request body
//     const { error } = loginSchema.validate(req.body);
//     if (error) {
//       return res.status(httpStatus.BAD_REQUEST).json({
//         status: "Validation Error",
//         message: error.details[0].message,
//       });
//     }

//     const { email, password } = req.body;

//     // ✅ check if user exists
//     const userExist = await User.findOne({ email });
//     if (!userExist) {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "Login error",
//         message: "No record found",
//       });
//     }

//     // ✅ check password
//     const isConfirmed = await bcrypt.compare(password, userExist.password);
//     if (!isConfirmed) {
//       return res.status(httpStatus.BAD_REQUEST).json({
//         status: "Error",
//         message: "Credentials not correct",
//       });
//     }

//     // ✅ generate token with role included
//     const token = jwtToken(userExist._id, userExist.email, userExist.role);

//     return res.status(httpStatus.OK).json({
//       status: "success",
//       message: "Login successful",
//       user: {
//         id: userExist._id,
//         name: userExist.name,
//         email: userExist.email,
//         role: userExist.role,
//       },
//       token,
//     });
//   } catch (error) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: error.message,
//     });
//   }
// };

// export { login };
//  import User from "../../models/users/user.js";
// import { registerSchema } from "../../validators/authValidator.js";
// import bcrypt from "bcrypt";
// import httpStatus from "http-status";

// //controller function to register users
// const registerUser = async (req, res) => {
//   try {
//     // vaildate the request body with the registerSchema
//     const { error } = registerSchema.validate(req.body);

//     if (error) {
//       return res.status(httpStatus.BAD_REQUEST).json({
//         status: "Validation Error",
//         message: error.details[0].message,
//       });
//     }
    
//     const { name, username, password, email, role } = req.body;

//     const emailExists = await User.findOne({
//       email,
//     });

//     if (emailExists) {
//       res.status(httpStatus.BAD_REQUEST).json({
//         status: "Error",
//         message: "User with email already exists",
//       });
//     }

//     const userName = await User.findOne({
//       username,
//     });

//     if (userName) {
//       res.status(httpStatus.BAD_REQUEST).json({
//         status: "Error",
//         message: "Username already exists",
//       });
//     }

//     //hash your password before saving to database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     //create and save user details to the database
//     const createdUser = await User.create({
//       name: name,
//       username: username,
//       email: email,
//       password: hashedPassword,
//       role: role,
//     });

//     //send a response(as view after successful registration)
//     res.status(httpStatus.CREATED).json({
//       status: "Success",
//       message: "User registered successfully",
//       userDetails: createdUser,
//     });
//   } catch (error) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: "An error occurred while registering user",
//       error: error.message,
//     });
//   }
// };

// export { registerUser };  import Recipe from "../../models/recipe/recipe.js";
// import { createRecipeSchema } from "../../validators/recipeValidator.js";
// import httpStatus from "http-status";

// const createRecipe = async (req, res) => {
//   try {
//     //   validate data from our request body
//     const { error } = createRecipeSchema.validate(req.body);
//     if (error) {
//       return res.status(httpStatus.BAD_REQUEST).json({
//         status: "Validation Error",
//         message: error.details[0].message,
//       });
//     }
//     // destructure recipe data from the request body
//     const { title, ingredients, instructions, videoUrl } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const existingTitle = await Recipe.findOne({
//       title,
//     });
//     if (existingTitle) {
//       return res.status(httpStatus.FOUND).json({
//         status: "Error",
//         message: "Title or Recipe already exists",
//       });
//     }

//     //create recipe
//     const createdRecipe = await Recipe.create({
//       title: title,
//       ingredients: ingredients,
//       instructions: instructions,
//       image: image,
//       videoUrl: videoUrl,
//     });

//     // return a response to the users
//     res.status(httpStatus.CREATED).json({
//       status: "Success",
//       recipe: createdRecipe,
//     });
//   } catch (error) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: "An error occured while creating Recipe",
//       error: error.message,
//     });
//   }
// };

// export { createRecipe };
// import Recipe from "../../models/recipe/recipe.js";
// import httpStatus from "http-status";

// //function to delete a recipe
// export const deleteRecipe = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         const recipe = await Recipe.findByIdAndDelete(id);
    
//         if (!recipe) {
//         return res.status(httpStatus.NOT_FOUND).json({
//             status: "FAIL",
//             message: "Recipe not found",
//         });
//         }
    
//         return res.status(httpStatus.OK).json({
//         status: "SUCCESS",
//         message: "Recipe deleted successfully",
//         });
    
//     } catch (error) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//         status: "ERROR",
//         message: error.message || "An error occurred while deleting the recipe",
//         });
//     }
//     };  import Recipe from "../../models/recipe/recipe.js";
// import httpStatus from "http-status";

// // controller function to get all stored recipes;
// export const getRecipes = async (req, res) => {
//   try {
//     const recipes = await Recipe.find({});
//     if (recipes) {
//       return res.status(httpStatus.OK).json({
//         status: "Success",
//         recipeDetails: recipes,
//       });
//     } else {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "Not Found",
//         message: "No recipe(s) found!",
//       });
//     }
//   } catch (error) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: error.message,
//     });
//   }
// };  import Recipe from "../../models/recipe/recipe.js";
// import httpStatus from "http-status";

// export async function getSingleRecipe(req, res) {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "NOT FOUND",
//         message: "Please provide a valid id",
//       });
//     }
//     let recipe;
//     recipe = await Recipe.findById(id);
//     if (!recipe) {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "NOT FOUD",
//         message: "No Recipe Found!",
//       });
//     } else {
//       return res.status(httpStatus.OK).json({
//         status: "Success",
//         message: "Recipe retrieved Successfully!",
//         recipeDetails: recipe,
//       });
//     }
//   } catch (e) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: e.message,
//     });
//   }
// }
// import User from "../../models/users/user.js";
// import httpStatus from "http-status";

// // function to delete a user
// export const deleteUser = async (req, res) => {
//   try {
//     //   get the id of the user from the request paramenter
//     const { id } = req.params;
//     //   find the user by id
//     let user;
//     user = await User.findById(id);
//     if (!user) {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "Not Found",
//         message: "User not found!",
//       });
//       }
      
//     await User.findByIdAndDelete(id);

//     res.status(httpStatus.OK).json({
//       status: "Success",
//       message: `User with id: ${id} deleted Successfullly!`,
//     });
      
//   } catch (e) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: "An error occured while deleting the user",
//       error: e.message,
//     });
//   }
// };
//  import User from "../../models/users/user.js";
// import httpStatus from "http-status";

// export const getSingleUser = async (req, res) => {
//   try {
//     //destructure the id from the request parameter
//     const { id } = req.params;
//     //check if the id is passed as a parameter in the endpoint
//     if (!id) {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "NOT FOUND",
//         message: "Please provide a valid id",
//       });
//     }

//     let user;
//     user = await User.findById(id);
//     if (!user) {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "NOT FOUND",
//         message: "User not found!",
//       });
//     } else {
//       return res.status(httpStatus.OK).json({
//         status: "Success",
//         message: "User details retrieved successfully!",
//         userDetails: user,
//       });
//     }
//   } catch (e) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: e.message,
//     });
//   }
// };  import User from "../../models/users/user.js";
// import httpStatus from "http-status";

// // controller to fetch user details by query parameters
// export const getUser = async (req, res) => {
//   try {
//     //get user query parameters
//     const type = req.query.type;
//     const id = req.query.id;
//     const email = req.query.email;
//     const username = req.query.username;

//     let user;
//     switch (type) {
//       case "id":
//         user = await User.findById(id);
//         if (!user) {
//           res.status(httpStatus.NOT_FOUND).json({
//             status: "Not Found",
//             message: `User with the id: ${id} not found!`,
//           });
//           break;
//         } else {
//           res.status(httpStatus.OK).json({
//             status: "Success",
//             userDetails: user,
//           });
//           break;
//         }

//       // query by email
//       case "email":
//         user = await User.findOne({ email });
//         if (!user) {
//           res.status(httpStatus.NOT_FOUND).json({
//             status: "Not Found",
//             message: `User is email: ${email} not Found!`,
//           });
//           break;
//         }
//         res.status(httpStatus.OK).json({
//           status: "Success",
//           userDetails: user,
//         });
//         break;
//       //query by username
//       case "username":
//         user = await User.findOne({ username });
//         if (!user) {
//           res.status(httpStatus.NOT_FOUND).json({
//             status: "Not Found",
//             message: `User with username: ${username} not Found!`,
//           });
//           break;
//         }
//         res.status(httpStatus.OK).json({
//           status: "Success",
//           userDetails: user,
//         });
//         break;
//       default:
//         res.status(httpStatus.NOT_FOUND).json({
//           status: "Not Found",
//           message: "No record(s) Found!",
//         });
//     }
//   } catch (error) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: error.message,
//     });
//   }
// };
//  import User from "../../models/users/user.js";
// import httpStatus from "http-status";

// // controller function to get all registered users;
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users) {
//       return res.status(httpStatus.OK).json({
//         status: "Success",
//         usersDetails: users,
//       });
//     } else {
//       return res.status(httpStatus.NOT_FOUND).json({
//         status: "Not Found",
//         message: "No record(s) found!",
//       });
//     }
//   } catch (error) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       status: "Error",
//       message: error.message,
//     });
//   }
// };
// import User from "../../models/users/user.js";
// import httpStatus from "http-status";

// export const updateUser = async (req, res) => {
//   const { password, username, name, role} = req.body;
//   const { id } = req.params;

//   let user;
//   user = await User.findById(id);
//   if (!user) {
//     return res.status(httpStatus.NOT_FOUND).json({
//       status: "NOT FOUND!",
//       message: "User not Found!",
//     });
//   }

//   user = await User.findByIdAndUpdate(
//     id,
//     { password: password, username: username, name: name, role: role },
//     { new: true }
//   );

//   res.status(httpStatus.OK).json({
//     status: "Success",
//     message: "User profile Updated Successful",
//   });
// };
// import httpStatus from "http-status";
// import jwt from "jsonwebtoken";

// const authorizeUser = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(httpStatus.UNAUTHORIZED).json({
//       status: "Unauthorized",
//       message: "Token not provided!",
//     });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded);
//     req.user = decoded;
//     next();
//   } catch (e) {
//     console.error("JWT Error:", e.message);
//     return res.status(httpStatus.UNAUTHORIZED).json({
//       status: "Unauthorized",
//       message: "Unauthorized: Token failed!",
//     });
//   }
// };

// const checkRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     console.log("Allowed Roles:", allowedRoles);
//     console.log("User Role:", req.user.role);

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(httpStatus.FORBIDDEN).json({
//         status: "FORBIDDEN",
//         message: "Forbidden: Access denied!",
//       });
//     }
//     next();
//   };
// };

// export { authorizeUser, checkRole };
// import path from "path";
// import multer from "multer";

// //define our file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// //filter images to be allowed
// const fileFilter = (req, file, cb) => {
//   let allowedTypes = /png|jpeg|jpg|gif/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowedTypes.test(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error(`Only images are allowed ${allowedTypes}`), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
//   fileFilter: fileFilter,
// });

// export default upload; import mongoose from "mongoose";

// const recipeSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     ingredients: {
//       type: String,
//       required: true,
//     },
//     instructions: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     videoUrl: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Recipe = mongoose.model("Recipe", recipeSchema);
// export default Recipe;  import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     username: {
//       type: String,
//       min: 4,
//       max: 10,
//       unique: true,
//       required: true,
//     },

//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       min: 10,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["regular", "admin"],
//       default: "regular",
//     },
//   },

//   {
//     timestamps: true,
//   }
// );

// //register user as a mongoose model
// const User = mongoose.model("User", userSchema);
// export default User;
//  import express from "express";
// import { createRecipe } from "../controllers/recipe/createRecipe.js";
// import { getSingleRecipe } from "../controllers/recipe/getSingleRecipe.js";
// import { getRecipes } from "../controllers/recipe/getAllRecipes.js";
// import { deleteRecipe } from "../controllers/recipe/deleteRecipe.js"; 
// import upload from "../middleware/upload.js";

// const router = express.Router();

// // ✅ Recipe endpoints
// router.post("/create-recipe", upload.single("image"), createRecipe);
// router.get("/recipe-details/:id", getSingleRecipe); // get single recipe by ID
// router.get("/all-recipes", getRecipes);             // get all recipes
// router.delete("/delete-recipe/:id", deleteRecipe);  // delete recipe by ID

// export default router;
// import express from "express";
// import { registerUser } from "../controllers/auth/register.js";
// import { login } from "../controllers/auth/login.js";
// import { getUsers } from "../controllers/users/getUsers.js";
// import { getUser } from "../controllers/users/getUser.js";
// import { getSingleUser } from "../controllers/users/getSingleUser.js";
// import { updateUser } from "../controllers/users/updateUser.js";
// import { deleteUser } from "./../controllers/users/deleteUser.js";
// import { authorizeUser, checkRole } from "../middleware/auth.js";

// // configure exress route
// const router = express.Router();

// // defining endpoints from routes
// router.post("/register-user", registerUser);
// router.post("/login", login);
// router.get("/all-users", authorizeUser, checkRole("admin"), getUsers);
// router.get("/get-user", authorizeUser, checkRole("admin"), getUser);
// router.get(
//   "/user-details/:id",
//   authorizeUser,
//   checkRole("admin"),
//   getSingleUser
// );
// router.patch(
//   "/update-profile/:id",
//   authorizeUser,
//   checkRole("admin", "regular"),
//   updateUser
// );
// router.delete(
//   "/delete-user/:id",
//   authorizeUser,
//   checkRole("admin"),
//   deleteUser
// );

// export default router;
//  //load environment variables fro .env file
// import dotenv from "dotenv";
// dotenv.config();
// import JWT from "jsonwebtoken";

// const { JWT_SECRET, JWT_EXPIRY } = process.env;
// export const jwtToken = (id, email, role) => {
//   return JWT.sign({ id, email, role }, JWT_SECRET, {
//     expiresIn: JWT_EXPIRY,
//   });
// };
// import Joi from "joi";

// //registration validation schema
// const registerSchema = Joi.object({
//   name: Joi.string().required(),
//   username: Joi.string().alphanum().min(4).max(10).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(10).required(),
//   role: Joi.string().valid("regular", "admin").required(),
// });

// //login validation schema
// const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// export { registerSchema, loginSchema };
// import Joi from "joi";

// const createRecipeSchema = Joi.object({
//   title: Joi.string().min(3).max(100).required(),
//   ingredients: Joi.string().min(5).required(),
//   instructions: Joi.string().min(10).required(),
//   videoUrl: Joi.string().required(),
// });

// const updateRecipeSchema = Joi.object({
//   title: Joi.string().min(3).max(100),
//   ingredients: Joi.string().min(5).required(),
//   instructions: Joi.string().min(10),
//   videoUrl: Joi.string().required(),
// });

// export { createRecipeSchema, updateRecipeSchema };
// PORT=5000
// ENV=development
// MONGO_URI=mongodb+srv://Noel:Activision@cluster0.wjbm1xd.mongodb.net/NOEL-KITCHEN

// # JWT
// JWT_SECRET=1234567890
// JWT_EXPIRY=1d

// # Email sender (use Gmail App Password)
// EMAIL_USER=yourgmail@gmail.com
// EMAIL_PASS=your_gmail_app_password
 
//  /node_modules
// .env              {

// to this   
// Project Scope & Deliverables 
// 1. Website Development 
// Each team will: 
// • Design a fully functional, responsive, and accessible departmental student information 
// board. 
// • Implement both front-end and back-end features. 
// • Include functionalities such as: 
// ✓ Posting and updating announcements. 
// ✓ Event calendar. 
// ✓ Search and filter options. 
// ✓ Secure admin login for posting updates. 
// ✓ Archive of past notices/events. 
// • Ensure user-friendly navigation and mobile responsiveness. 
// 2. Requirement Document 
// Alongside the technical work, each team will prepare a Software Requirement Specification 
// (SRS) or Requirement Document detailing: 
// • Introduction & Purpose of the system. 
// • Scope (what the system will do). 
// • Functional Requirements (features and interactions). 
// • Non-functional Requirements (performance, security, usability). 
// • System Models (use case diagrams, ER diagrams, etc.). 
// • Constraints and assumptions. 
// • Proposed Technology Stack. 