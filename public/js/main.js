function getNotes() {
	$.get("/notes", function(data) {
		if (!data) {
			console.log("Nothing received in the client side...");
		} else {
			fillNotes(data);
		}
	});
}

function editNote(event) {
	console.log("Editar nota " + event.data.noteId);
}

function deleteNote(event) {
	$.post("/notes/delete", event.data, function(data) {
		getNotes();
	});
}

function fillNotes(notes) {
	$("#main").empty();

	notes.forEach(function(note) {
		let divElement = $("<div/>", {"class": "note"});

		divElement.append(
			$("<textarea/>", {"text": note.content}).change({"noteId": note.id}, editNote),
			$("<input/>", {"text": "Borrar", "type": "submit"}).click({"noteId": note.id}, deleteNote),
		);

		$("#main").append(divElement);
	});
}

$(document).ready(getNotes);
