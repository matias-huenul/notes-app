const port = 3000;

let express = require("express");
let sqlite3 = require("sqlite3");
let bodyParser = require("body-parser");

let app = express();
let db = new sqlite3.Database("db/notes.db");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(request, response) {
	response.send("Hello from the server side");
});

app.get("/notes", function(request, response) {
	db.all("SELECT * FROM notes", function(err, rows) {
		if (err) {
			console.log("An error has ocurred");
			console.log(err);
		} else {
			console.log("get success");
			response.send(rows);
		}
	});
});

app.post("/notes", function(request, response) {
	db.run(
		"INSERT INTO notes (content) values (?)",
		[request.body["new-note-content"]],
		function (err) {
			if (err) {
				console.log("Error " + err);
			} else {
				response.status(200).redirect("index.html");
			}
		}
	);
});

app.post("/notes/delete", function(request, response) {
	db.run(
		"DELETE FROM notes where id = ?",
		[request.body.noteId],
		function(err) {
			if (err) {
				console.log("Error: " + err);
			} else {
				response.status(200).redirect("../index.html");
			}
		}
	);
});

app.listen(port, function() {
	console.log("Server is running on port " + port);
});
