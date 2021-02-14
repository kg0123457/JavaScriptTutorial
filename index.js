const connectionString = "<YOUR_CONNECTION_STRING_HERE>";
const cors = require('cors');
const path = require('path');
const port = 3000;
var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const entrySchema = require("./entrySchema.js");
const accountSchema = require("./accountSchema.js");
const Entry = mongoose.model("entry", entrySchema, "entry");
const Account = mongoose.model("account", accountSchema, "account");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function createEntry(teacher, subject, topic, confirmed) {
	return new Entry({
		teacher,
		subject,
		created: Date.now(),
		topic,
		confirmed
	}).save();
};

app.get('/entry', (req, res) => {
	const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	Entry.find({'confirmed':1}, function(err, result) {
		if (!err) {
			return res.render('index', {posts: result});
		}
	});
});

app.post('/entry_submission', (req, res) => {
    var teacher = String(req.body.teacher);
    var subject = String(req.body.subject);
    var topic = String(req.body.topic);
	const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	createEntry(teacher, subject, topic, 0);
	Entry.find({'confirmed': 1}, function(err, results) {
		if (!err) {
			return res.render('index', {posts: results});
		}
	});
});

app.post('/login', (req, res) => {
    var username = String(req.body.username);
    var pass = String(req.body.pass);
	const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	Account.find({'username':username, 'pass':pass}, function(err, result) {
		if (!err) {
			
			Entry.find({'confirmed':0}, function(err, results) {
				if (!err) {
					res.render('confirm', {posts: results});
				}
			});
		}
	});
});

app.post('/update', (req, res) => {
	var id = String(req.body.id);
	var teacher = String(req.body.teacher);
	var subject = String(req.body.subject);
	var date = String(req.body.date);
	var topic = String(req.body.topic);
	const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	Entry.findByIdAndUpdate({'_id':id}, { $set: { confirmed: 1 }}, function(err, results) {
		if (!err) {
			res.send(results);
		}
	});
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
