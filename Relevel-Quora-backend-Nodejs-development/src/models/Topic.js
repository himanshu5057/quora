const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
	name: { type: String, default: null, unique: true },
	description: { type: String },
	subscribers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	posts:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	]
});

module.exports = mongoose.model("Topic", topicSchema);
