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
		model.note.getLast(view.note.render);
		view.note.clearNewNoteContent();
	},
	start: function() {
		model.note.getAll(function(notes) {
			notes.forEach(view.note.render);
		});
	}
}

$(document).ready(app.start);
