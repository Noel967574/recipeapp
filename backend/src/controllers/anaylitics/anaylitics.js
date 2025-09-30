import httpStatus from 'http-status';
import User from '../../models/users/user.js';


const getUserCountByRole = async (req, res) => {
    try{
        const result = await User.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        res.status(httpStatus.ok).json({ status: "success", data: result });
    } catch (err) {
        res
        .status(httpStatus.INTERNAL)
        .json({ status: "Error", message: err.message});
    }
};
export {getUserCountByRole};


