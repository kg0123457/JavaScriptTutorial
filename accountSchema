const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"]
	},
	pass: {
		type: String,
		required: [true, "Password is required"]
	}
});

module.exports = accountSchema;
