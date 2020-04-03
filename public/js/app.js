let app = {
	editNote: function(event) {
		let content = view.note.getContent(event.data.id);
		model.note.edit(event.data.id, content);
	},
	deleteNote: function(event) {
		if (confirm("Are you sure you want to delete this note?")) {
			model.note.delete(event.data.id);
			view.note.remove(event.data.id);
		}
	},
	createNote: function(event) {
		let content = view.note.getNewNoteContent();
		if (!content) {
			return alert("Can't create empty note");
		}
		model.note.create(content);
		model.note.getLast(view.note.renderNew);
		view.note.clearNewNoteContent();
	},
	filterNotes: function() {
		let query = view.searchBar.getValue().toLowerCase();
		model.note.getAll(function(notes) {
			notes.forEach(function(note) {
				if (note.content.toLowerCase().includes(query)) {
					view.note.get(note.id).show();
				} else {
					view.note.get(note.id).hide();
				}
			});
		});
	},
	start: function() {
		model.note.getAll(function(notes) {
			notes.forEach(view.note.render);
		});
	}
};

$(document).ready(app.start);
