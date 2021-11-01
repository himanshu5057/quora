// User Model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, default: null },
	email: { type: String, unique: true },
	password: { type: String },
	topics: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Topic",
		},
	],
});

module.exports = mongoose.model("User", userSchema);
