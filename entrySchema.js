const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
	teacher: {
		type: String,
		required: [true, "Username is required"]
	},
	subject: {
		type: String,
		required: [true, "Subject is required"]
	},
	created: {
		type: Date,
		required: [true, "Created date is required"]
	},
	topic: {
		type: String,
		required: [true, "Topic is required"]
	},
	confirmed: {
		type: Number,
		require: [true, "Confirmed is required"]
	}
});

module.exports = entrySchema;
