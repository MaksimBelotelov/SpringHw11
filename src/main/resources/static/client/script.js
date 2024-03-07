getAllNotes();

const notesForm = document.forms["notesForm"];
let noteId= 0;

function row(note) {
    const tr = document.createElement("tr");
    tr.setAttribute("note-rowid", note.id);

    const idTd = document.createElement("td");
    idTd.append(note.id);
    tr.append(idTd);

    const titleTd = document.createElement("td");
    titleTd.append(note.title);
    tr.append(titleTd);

    const contentTd = document.createElement("td");
    contentTd.append(note.content);
    tr.append(contentTd);

    const dateTd = document.createElement("td");
    dateTd.append(note.dateCreated);
    tr.append(dateTd);
       
    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.setAttribute("note-id", note.id);
    editLink.append("Изменить");
    editLink.addEventListener("click", async e => {
        e.preventDefault();
        await getNote(note.id);
    });

    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.setAttribute("note-id", note.id);
    removeLink.append("Удалить");
    removeLink.addEventListener("click", async e => {
        e.preventDefault();
        await deleteNote(note.id);
    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

function reset() {
    notesForm.reset();
    userId = 0;
}

async function getAllNotes() {
    const response = await fetch("http://localhost:8080/notes", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const notes = await response.json();
        const rows = document.querySelector("tbody");
        notes.forEach(note => rows.append(row(note)));
    }
}

async function getNote(id) {
    const response = await fetch("http://localhost:8080/notes/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const note = await response.json();
        noteId = note.id;
        notesForm.elements["id"].value = note.id;
        notesForm.elements["title"].value = note.title;
        notesForm.elements["content"].value = note.content;
    }
}

async function createNote(title, content) {
    const response = await fetch("http://localhost:8080/notes", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title,
            content: content
        })
    });
    if (response.ok === true) {
        const note = await response.json();
        reset();
        document.querySelector("tbody").append(row(note));
    }
}

async function deleteNote(id) {
    const response = await fetch("http://localhost:8080/notes/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        document.querySelector("tr[note-rowid='" + id + "']").remove();
    }
}
async function editNote(noteId, title, content) {
    const response = await fetch("http://localhost:8080/notes/" + noteId, {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title,
            content: content
        })
    });
    if (response.ok === true) {
        const note = await response.json();
        reset();
        document.querySelector("tr[note-rowid='" + noteId + "']").replaceWith(row(note));
    }
}

notesForm.addEventListener("submit", e => {
    e.preventDefault();
    if(noteId === 0) createNote(notesForm.elements["title"].value,
        notesForm.elements["content"].value);
    else editNote(noteId, notesForm.elements["title"].value,
        notesForm.elements["content"].value);
});



