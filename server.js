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
			console.log("Error: " + err);
		} else {
			response.send(rows);
		}
	});
});

app.get("/notes/last", function(request, response) {
	db.all("SELECT * FROM notes order by id desc limit 1", function(err, rows) {
		if (err) {
			console.log("Error: " + err);
		} else {
			response.send(rows[0]);
		}
	});
})

app.post("/notes", function(request, response) {
	if (!request.body.id) {
		db.run("INSERT INTO notes (content) values (?)", [request.body.content], function (err) {
			if (err) {
				console.log("Error: " + err);
			} else {
				response.status(200);
			}
		});
	} else {
		db.run("UPDATE notes set content = ? where id = ?", [request.body.content, request.body.id], function(err) {
			if (err) {
				console.log("Error: " + err)
			} else {
				response.status(200);
			}
		});
	}
});

app.post("/notes/delete", function(request, response) {
	db.run("DELETE FROM notes where id = ?", [request.body.id], function(err) {
		if (err) {
			console.log("Error: " + err);
		} else {
			response.status(200);
		}
	});
});

app.listen(port, function() {
	console.log("Server is running on port " + port);
});
