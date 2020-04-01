let view = {
	note: {
		render: function(note) {
			let divElement = $("<div/>", {
				"class": "note",
				"note-id": note.id
			});

			divElement.append(
				$("<textarea/>", {
					"text": note.content,
					"spellcheck": false
				}).change(note, app.editNote),
				$("<button/>", {
					"text": "Delete",
					"class": "delete-note-button"
				}).click(note, app.deleteNote),
			);

			$("#main").append(divElement);
		},
		remove: function(id) {
			$(".note[note-id='" + id + "']").remove();
		},
		getContent: function(id) {
			return $(".note[note-id='" + id + "'] > textarea").val();
		},
		getNewNoteContent: function() {
			return $("#new-note > textarea").val();
		},
		clearNewNoteContent: function() {
			$("#new-note > textarea").val("");
		},
		getTextArea: function(id) {
			return $(".note[note-id='" + id + "'] > textarea");
		},
		getDeleteButton: function(id) {
			return $(".note[note-id='" + id + "'] > .delete-note-button");
		}
	}
};
