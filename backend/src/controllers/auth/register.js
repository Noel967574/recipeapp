import User from "../../models/users/user.js"; // ✅ FIXED: default import
import { registerSchema } from "../../validators/authValidator.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { encrypt } from "../../utils/crypto.js";

// Controller function to register users
const registerUser = async (req, res) => {
  try {
    // validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message,
      });
    }

    const { name, username, password, email, role } = req.body;

    // check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Error",
        message: "User with email already exists",
      });
    }

    // check if username already exists (before encryption)
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Error",
        message: "Username already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // encrypt username
    const encryptedUsername = encrypt(username);

    // create user
    const createdUser = await User.create({
      name,
      username: encryptedUsername,
      email,
      password: hashedPassword,
      role,
    });

    res.status(httpStatus.CREATED).json({
      status: "Success",
      message: "User registered successfully",
      userDetails: createdUser,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "An error occurred while registering user",
      error: error.message,
    });
  }
};

export { registerUser };
