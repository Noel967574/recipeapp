import mongoose from "mongoose";
import User from "../../models/users/user.js";
import httpStatus from "http-status";
import { decrypt } from "../../utils/crypto.js";
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Error",
        message: `Invalid user id: ${id}`,
      });
    }

    const user = await User.findById(id).lean(); // plain object
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Error",
        message: "User not found!",
      });
    }

    return res.status(httpStatus.OK).json({
      status: "Success",
      message: "User details retrieved successfully!",
      userDetails: user,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: e.message,
    });
  }
};
