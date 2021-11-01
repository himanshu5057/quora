const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());


const loginRouter = require("./routes/auth.js");
app.use("/api", loginRouter);
const topicRouter = require("./routes/topic.js");
app.use("/", topicRouter);

// port at which server listening
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(process.env.PORT || 5000);
server.on("error", onError);
server.on("listening", onListening);

//error
function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}
	//console.log(error);
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			process.exit(1);
			break;
		case "EADDRINUSE":
			process.exit(1);
			break;
		default:
			throw error;
	}
}

//
function onListening() {
	//for add mongodb add %40 instead of @
	var addr = server.address();
	console.log("lll");
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	"Listening on " + bind;
	let db = mongoose.connect(
		process.env.MONGO_URL,

		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//	useFindAndModify: false,
			//	useCreateIndex: true,
		}
	);
}

// sample for express server
mongoose.connection.on("error", function (err) {
	console.log("database connection error");
	console.log(err);
}); // end mongoose connection error

mongoose.connection.on("open", function (err) {
	if (err) {
		console.log(`database error`);
		console.log(err);
	} else {
		console.log(
			`database connected successfully port no : ${process.env.PORT}`
		);
	}
});
