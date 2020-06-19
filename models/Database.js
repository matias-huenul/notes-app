const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("db/notes.db");

db.run(`
	CREATE TABLE IF NOT EXISTS notes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		content TEXT NOT NULL
	)`
);

module.exports = {
	getRows: (query, parameters) => {
		return new Promise((resolve, reject) => {
			db.all(query, parameters, (error, rows) => {
				if (error) {
					reject(error);
				} else{
					resolve(rows);
				}
			});
		});
	},

	execute: (query, parameters) => {
		return new Promise((resolve, reject) => {
			db.run(query, parameters, (error) => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	},
};
