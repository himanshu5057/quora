const { body } = require("express-validator");
exports.topic = [
	body("name").not().isEmpty(),
	body("description").isLength({min:5,max:100}),
];
