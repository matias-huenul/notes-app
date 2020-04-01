let model = {
	note: {
		create: function(content, callback) {
			$.post("/notes", {"content": content}, callback);
		},
		edit: function(id, content, callback) {
			$.post("/notes", {"id": id, "content": content}, callback);
		},
		getAll: function(callback) {
			$.get("/notes", callback);
		},
		getLast: function(callback) {
			$.get("/notes/last", callback);
		},
		delete: function(id, callback) {
			$.post("/notes/delete", {"id": id}, callback);
		}
	}
};
