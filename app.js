const port = 3000;

let express = require("express");
let sqlite3 = require("sqlite3");
let bodyParser = require("body-parser");

let app = express();
let db = new sqlite3.Database("db/notes.db");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

function logError(request, error) {
	console.log(`Error at ${request.method} ${request.url}: ${error}`);
}

function callback(response, error, rows) {
	if (error) {
		logError(error);
		response.sendStatus(500);
	} else if (rows) {
		response.status(200).send(rows);
	} else {
		response.sendStatus(200);
	}
}

app.get("/notes", function(request, response) {
	let query = "SELECT * FROM notes ORDER BY id DESC",
		args = [];

	if (request.query.limit) {
		query += " LIMIT ?";
		args.push(request.query.limit);
	}

	db.all(query, args, (error, rows) => callback(response, error, rows));
});

app.post("/notes", function(request, response) {
	db.run(
		"INSERT INTO notes (content) VALUES (?)",
		[request.body.content],
		error => callback(response, error)
	);
});

app.put("/notes", function(request, response) {
	db.run(
		"UPDATE notes SET content = ? WHERE id = ?",
		[request.body.content, request.body.id],
		error => callback(response, error)
	);
});

app.delete("/notes", function(request, response) {
	db.run(
		"DELETE FROM notes WHERE id = ?",
		[request.body.id],
		error => callback(response, error)
	);
});

app.listen(port, function() {
	console.log("Server is running on port " + port);
});
