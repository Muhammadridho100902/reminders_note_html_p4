const title = document.getElementById('title');
const notes = document.getElementById('notes');
const date = document.getElementById('date');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');
const showBtn = document.getElementById('showBtn');

// instance database
const database = firebase.database();
// reference
const usersRef = database.ref('/users/dOJjS5z5c5SfXtgRh2FgHLSSxvK2/notes');


// save the data or add data
addBtn.addEventListener('click', e => {
    e.preventDefault();
    var newPostKey = Math.floor(Math.random() * 1000);
    usersRef.child(newPostKey).set({
        userId_: newPostKey,
        title_: title.value,
        notes_: notes.value,
        date_: date.value
    });
    alert("New Data has been creat")
    window.open("seeNotes.html", "_self")
});