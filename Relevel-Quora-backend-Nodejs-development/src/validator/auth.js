const { body } = require("express-validator");
exports.userLogin = [
	body("name").not().isEmpty(),
	body("email").isEmail(),
	body("password").not().isEmpty(),
];
