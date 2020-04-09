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

function getRows(query, request, response, oneRow) {
	db.all(query, Object.values(request.query), function(err, rows) {
		if (err) {
			logError(request, err);
		} else if (oneRow) {
			response.send(rows[0]);
		} else {
			response.send(rows);
		}
	});
}

function execute(query, args, response) {
	db.run(query, args, function(err) {
		if (err) {
		} else {
			response.status(200);
		}
	});
}

app.get("/notes", function(request, response) {
	getRows("SELECT * FROM notes ORDER BY id desc", request, response);
});

app.get("/notes/last", function(request, response) {
	getRows("SELECT * FROM notes order by id desc limit 1", request, response, true);
});

app.post("/notes", function(request, response) {
	if (!request.body.id) {
		execute("INSERT INTO notes (content) values (?)", [request.body.content], response);
	} else {
		execute("UPDATE notes set content = ? where id = ?", [request.body.content, request.body.id], response);
	}
});

app.post("/notes/delete", function(request, response) {
	execute("DELETE FROM notes where id = ?", [request.body.id], response);
});

app.listen(port, function() {
	console.log("Server is running on port " + port);
});
