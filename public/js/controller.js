let controller = {
	defaultFolderId: 0,
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
		model.note.create(content)
		.then(model.note.getLast)
		.then(view.note.renderNew)
		.then(view.note.clearNewNoteContent);
	},
	filterNotes: function() {
		let query = view.searchBar.getValue().toLowerCase();
		model.note.getAll().then(notes => {
			notes.forEach(note => {
				let noteView = view.note.get(note.id);
				note.content.toLowerCase()
				.includes(query) ? noteView.show() : noteView.hide();
			});
		});
	},
	start: function() {
		model.note.getAll()
		.then(notes => notes.forEach(view.note.render));
	}
};

$(document).ready(controller.start);
