let model = {
	note: {
		create: function(content) {
			return $.post("/notes", {content});
		},
		edit: function(id, content) {
			return $.post("/notes", {id, content});
		},
		getAll: function() {
			return $.get("/notes");
		},
		getLast: function() {
			return $.get("/notes/last");
		},
		delete: function(id) {
			return $.post("/notes/delete", {id});
		}
	}
};
