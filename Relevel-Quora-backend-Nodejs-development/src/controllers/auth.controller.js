const bcrypt = require("bcryptjs");
const UsersModel = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");
const UserModel = require("../models/User");

dotenv.config();
const register = async (req, res) => {
	try {
		console.log("hello");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				error: errors.array()[0],
			});
		}

		//encrypting the passoword
		const salt = await bcrypt.genSalt(10);
		let password = await bcrypt.hash(req.body.password, salt);

		//creating the entry in database
		var createUser = await UsersModel.create({
			email: req.body.email,
			password: password,
		});
		let token;

		//constructing token so that he can be looged in automatically
		const payload = {
			user: {
				userId: createUser._id,
				email: req.body.email,
			},
		};
		token = jwt.sign(payload, process.env.secret, {});

		res.json({
			status: 1,
			message: "user successfully registered",
			token: token,
		});
	} catch (err) {
		//Duplicate field error !!
		if (err.name === "MongoError" && err.code === 11000) {
			res.status(401).json({
				result: false,
				msg: "user already exist",
				field: err.keyValue,
			});
		} else {
			res.status(401).json(err);
		}
	}
};

const login = async (req, res) => {
	try {
		//console.log("login", req.body);
		console.log(process.env.secret);
		let userData = await UserModel.findOne({ email: req.body.email });
		//console.log(userData)
		if (userData == null) {
			res.json({
				status: 0,
				message: "Account not found. Please enter a registered email",
			});
		} else {
			let token;

			let tempPass = userData.password;
			//checking if correct password is entered or not
			const comparePassword = async (p1, p2) => {
				const match = await bcrypt.compare(p1, p2);
				//console.log(match)
				if (match) {
					//if password entered matches the password in db

					//deciding what data needs to be loaded in token
					const payload = {
						user: {
							userId: userData._id,
							email: req.body.email,
						},
					};
					//console.log(payload)
					//creating token and loading data in token
					token = jwt.sign(payload, process.env.secret, {});
					res.status(200).json({
						status: 1,
						message: "Successfully logged in ",
						token: token,
					});
				}

				//if password entered is wrong
				else {
					//console.log(match +"yes?")

					res.status(200).json({
						status: 0,
						message: "Wrong Password",
					});
				}
			};

			//calling the above defined function
			await comparePassword(req.body.password, tempPass);
		}
	} catch (error) {
		throw error;
	}
};

const AuthController = {
	register,
	login,
};

module.exports = AuthController;
