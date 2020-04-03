let view = {
	note: {
		render: function(note, newNote) {
			let divElement = $("<div/>", {
				"class": "note",
				"note-id": note.id
			});

			let deleteIcon = $("<i/>", {
				"class": "fas fa-trash"
			});

			divElement.append(
				$("<textarea/>", {
					"text": note.content,
					"spellcheck": false
				}).change(note, app.editNote),
				$("<button/>", {
					"text": "Delete",
					"class": "delete-note-button",
					"html": deleteIcon
				}).click(note, app.deleteNote),
			);

			if (newNote === true) {
				divElement.insertBefore(".note:nth-child(2)");
			} else {
				$("#main").append(divElement);
			}
		},
		renderNew: function(note) {
			view.note.render(note, true);
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
		get: function(id) {
			return $(".note[note-id='" + id + "'");
		},
		getTextArea: function(id) {
			return $(".note[note-id='" + id + "'] > textarea");
		},
		getDeleteButton: function(id) {
			return $(".note[note-id='" + id + "'] > .delete-note-button");
		}
	},
	searchBar: {
		getValue: function() {
			return $("#search-bar").val();
		}
	}
};
