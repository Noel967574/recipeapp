import User from "../../models/users/user.js";
import httpStatus from "http-status";

// function to delete a user
export const deleteUser = async (req, res) => {
  try {
    //   get the id of the user from the request paramenter
    const { id } = req.params;
    //   find the user by id
    let user;
    user = await User.findById(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Not Found",
        message: "User not found!",
      });
      }
      
    await User.findByIdAndDelete(id);

    res.status(httpStatus.OK).json({
      status: "Success",
      message: `User with id: ${id} deleted Successfullly!`,
    });
      
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "An error occured while deleting the user",
      error: e.message,
    });
  }
};
