import User from "../../models/users/user.js";
import httpStatus from "http-status";

const getUserStats = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $facet: {
          roleStats: [
            { $group: { _id: "$role", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          nameLengthStats: [
            { $project: { nameLength: { $strLenCP: "$name" } } },
            { $group: { _id: null, avgNameLength: { $avg: "$nameLength" } } }
          ]
        }
      }
    ]);

    return res.status(httpStatus.OK).json({
      status: "Success",
      data: result[0], // result comes back as an array with one element
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: "Error", message: err.message });
  }
};

export { getUserStats };
