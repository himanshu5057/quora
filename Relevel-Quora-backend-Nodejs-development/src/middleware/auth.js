const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/User");
dotenv.config();

//authenticating users
const verifyUser = async (req, res, next) => {
	try {
		var authHeader =
			req.body.authorization ||
			req.query.authorization ||
			req.headers["x-access-token"] ||
			req.headers["authorization"];
		var decoded;

		if (authHeader) {
			let token = authHeader.split(" ");
			decoded = jwt.verify(token[1], process.env.secret);
			if (!decoded) {
				return res.json({ success: 0, message: "token expired" });
			} else {
				let findUser = await UserModel.findOne({
					_id: decoded.user.userId,
				});
				if (findUser == null) {
					return res.json({ success: 0, message: "Invalid User" });
				} else {
					req.userData = findUser;
					next();
				}
			}
		} else {
			return res.json({ success: 0, message: "Token Not Found" });
		}
	} catch (error) {
		return res.json({ success: 0, message: "Invalid token" });
	}
};

module.exports = {
	verifyUser,
};
