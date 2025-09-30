import User from "../../models/users/user.js";
import httpStatus from "http-status";

export const updateUser = async (req, res) => {
  const { password, username, name, role} = req.body;
  const { id } = req.params;

  let user;
  user = await User.findById(id);
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "NOT FOUND!",
      message: "User not Found!",
    });
  }

  user = await User.findByIdAndUpdate(
    id,
    { password: password, username: username, name: name, role: role },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "Success",
    message: "User profile Updated Successful",
  });
};
