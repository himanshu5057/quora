const express = require("express");
const router = express.Router();
const TopicController = require("../controllers/topic.controller");
const validator = require("../validator/topic");
const middleware = require("../middleware/auth");
// Create routes for user here

router.post("/topic", middleware.verifyUser,validator.topic, TopicController.addTopic);
router.get("/topic/:topicId", middleware.verifyUser, TopicController.getTopic);

module.exports = router;
