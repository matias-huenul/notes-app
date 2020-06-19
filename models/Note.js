const db = require("./Database");

module.exports = {
	create: (content) => {
		return db.execute(`
			INSERT INTO notes
			(content)
			VALUES (?)
		`, [content]);
	},

	get: () => {
		return db.getRows(`
			SELECT * FROM notes
			ORDER BY id DESC
		`);
	},

	update: (id, content) => {
		return db.execute(`
			UPDATE notes
			SET content = ?
			WHERE id = ?
		`, [content, id]);
	},

	delete: (id) => {
		return db.execute(`
			DELETE FROM notes
			WHERE id = ?
		`, [id]);
	},

};
