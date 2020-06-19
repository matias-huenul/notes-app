const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const note = require(`${__dirname}/models/Note`);
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: false}));

/* Fetches all existing notes.
 * Each note is an object {id, content}.
 */
app.get("/notes", (request, response) => {
	note.get()
	.then(rows => response.status(200).send(rows))
	.catch(error => response.sendStatus(500));
});

/* Creates a note.
 *
 * Body parameters
 * ---------------
 * content: String
 *     Content of the new note.
 */
app.post("/notes", (request, response) => {
	let {content} = request.body;

	note.create(content)
	.then(() => response.sendStatus(200))
	.catch((error) => response.sendStatus(500));
});

/* Updates a note.
 * 
 * Body parameters
 * ---------------
 * id: Number
 *     Note ID.
 * content: String
 *     New content for the note.
 */
app.put("/notes", (request, response) => {
	let {id, content} = request.body;

	note.update(id, content)
	.then(() => response.sendStatus(200))
	.catch((error) => response.sendStatus(500));
});

/* Deletes a note.
 *
 * Body parameters
 * ---------------
 * id: Number
 *     Note ID.
 */
app.delete("/notes", (request, response) => {
	let {id} = request.body;

	note.delete(id)
	.then(() => response.sendStatus(200))
	.catch((error) => response.sendStatus(500));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
