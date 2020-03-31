function getNotes() {
	$.get("/notes", function(data) {
		if (!data) {
			console.log("Nothing received in the client side...");
		} else {
			fillNotes(data);
		}
	});
}

function createNote() {
	let data = {"noteContent": $("#new-note > textarea").val()};
	if (!data.noteContent) {
		alert("Can't create empty note");
		return;
	}

	$.post("/notes", data, function(data) {
		$.get("/notes/last", function(data) {
			if (!data) {
				// something
			} else {
				fillNotes(data);
			}
		});
		$("#new-note > textarea").val("");
	});
}

function editNote(event) {
	console.log("Editar nota " + event.data.noteId);
	let newNoteContent = $(".note[note-id='" + event.data.noteId + "'] > textarea").val();
	$.post("/notes", {"noteId": event.data.noteId, "content": newNoteContent}, function(data) {

	});
}

function deleteNote(event) {
	if (!confirm("Are you sure you want to delete the note?")) {
		return;
	}

	$.post("/notes/delete", event.data, function(data) {
		$(".note[note-id='" + event.data.noteId + "']").remove();
	});
}

function fillNotes(notes) {
	//$("#main").remove(".note");

	notes.forEach(function(note) {
		let divElement = $("<div/>", {"class": "note", "note-id": note.id});

		divElement.append(
			$("<textarea/>", {"text": note.content, "spellcheck": false}).change({"noteId": note.id}, editNote),
			$("<button/>", {"text": "Delete", "class": "delete-note-button"}).click({"noteId": note.id}, deleteNote),
		);

		$("#main").append(divElement);
	});
}

function main() {
	getNotes();
}

$(document).ready(main);
