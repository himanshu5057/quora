const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const UserModel = require("../models/User");
const TopicModel = require("../models/Topic");
const middleware = require("../middleware/auth");
const dotenv = require("dotenv");

dotenv.config();

const addTopic = async (req, res) => {
	//addTopic api logic here
	//if any errors
	try {
		console.log("hhh");
		console.log(req.userData._id);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				error: errors.array()[0],
			});
		}
		let topic = await TopicModel.create({
			name: req.body.name,
			description: req.body.description,
		});

		console.log(topic);
		if (topic) {
			await UserModel.findOneAndUpdate(
				{ _id: req.userData._id },
				{ $push: { topics: topic._id } }
			);
			return res.json({
				result: true,
				id: topic._id,
			});
		} else {
			return res.json({
				result: false,
				message: "Error Occured",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const getTopic = async (req, res) => {
	try {
		let topic = await TopicModel.findById(req.params.topicId);
		console.log(topic);
		if (topic) {
			return res.status(201).send({
				result: true,
				topic,
			});
		} else {
			return res.json({
				result: false,
				message: "Topic id does not exists",
			});
		}
	} catch (error) {
		// console.log(error);
		return res.json({
			result: false,
			message: "Something went wrong",
		});
	}
};

const deleteTopic = async (req, res) => {
}
const PostController={addTopic,getTopic};
module.exports = PostController;
