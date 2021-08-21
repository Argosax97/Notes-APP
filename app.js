const AddNote = document.querySelector(".add_note");
const Main = document.querySelector("main");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

AddNote.addEventListener("click", () => {
    addNewNote();
})

function addNewNote(text = "") {
    let note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `<div class="note_header">

                        <button class="btn clear"><i class="fas fa-eraser"></i></button>
                        <button class="btn complete"><i class="fas fa-check-square"></i></button>
                        <button class="btn edit"><i class="fas fa-edit"></i></button>
                        <button class="btn delete"><i class="fas fa-trash-alt"></i></button>
                      </div>
                      <textarea class="textarea"></textarea>
                      <div class="container"><div>`



    let editBtn = note.querySelector(".edit");
    let deleteBtn = note.querySelector(".delete");

    let textarea = note.querySelector("textarea");
    let container = note.querySelector(".container");

    let complete = note.querySelector(".complete");
    let clear = note.querySelector(".clear");

    textarea.value = text;
    container.innerHTML = text;

    //Edit
    editBtn.addEventListener("click", () => {

        editBtn.classList.toggle("hidden");

        container.classList.toggle("hidden");
        textarea.classList.toggle("visible");

        complete.classList.toggle("visible");
        clear.classList.toggle("visible");
    })

    //Complete
    complete.addEventListener("click", () => {
        editBtn.classList.toggle("hidden");
        complete.classList.toggle("visible");
        clear.classList.toggle("visible");
        container.classList.toggle("hidden");
        textarea.classList.toggle("visible");
    })

    textarea.addEventListener("input", (e) => {
        container.innerHTML = e.target.value;
        runLocalStorage()
    })

    //Clear
    clear.addEventListener("click", () => {
        textarea.value = "";
    })
    //delete btn
    deleteBtn.addEventListener("click", () => {
        note.remove();
        runLocalStorage()
    })

    Main.append(note);

}

function runLocalStorage() {
    const allNotes = document.querySelectorAll("textarea");

    const notesLS = [];
    allNotes.forEach((note) => {
        notesLS.push(note.value);
    })

    localStorage.setItem("notes", JSON.stringify(notesLS));
}