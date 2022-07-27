const firebaseConfig = {
    apiKey: "AIzaSyAJOYf9LXfm6hoRCv1O9VvN1dJLEMeCcjU",
    authDomain: "web-and-android-93af4.firebaseapp.com",
    databaseURL: "https://web-and-android-93af4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web-and-android-93af4",
    storageBucket: "web-and-android-93af4.appspot.com",
    messagingSenderId: "512267870295",
    appId: "1:512267870295:web:751c9274f1ac4614f34312"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

//filling the table
let userNo;
// Get all data
function selectAllData() {
    document.getElementById("tbody1").innerHTML = "";
    userNo = 0;
    firebase.database().ref('users/dOJjS5z5c5SfXtgRh2FgHLSSxvK2/notes').once('value', (allRecords) => {
        // firebase.database().ref('users/').orderByChild('user').equalTo("<% out.print(uid); %>").once('value', (allRecords) => {
        allRecords.forEach(item => {
            console.log(item.val());
            const userId = item.val().userId_;
            const title = item.val().title_;
            const notes = item.val().notes_;
            const date = item.val().date_;
            console.log(date, 'date');
            AddItemsToTable(userId, title, notes, date);
            // AddItemsToTable(title, notes, date);
        });
    })
}

// new start
var userList = [];
// end start

function AddItemsToTable(userId, title, notes, date) {
    // function AddItemsToTable(title, notes, date) {
    const tbody = document.getElementById('tbody1');
    const trow = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    // const td1 = document.createElement('td');
    // const td2 = document.createElement('td');
    // const td3 = document.createElement('td');
    // const td4 = document.createElement('td');
    // new start
    userList.push([userId, title, notes, date]);
    // userList.push([title, notes, date]);
    // end start
    td1.innerHTML = ++userNo;
    td2.innerHTML = userId;
    td3.innerHTML = title;
    td4.innerHTML = notes;
    td5.innerHTML = date;
    // td1.innerHTML = ++userNo;
    // td2.innerHTML = title;
    // td3.innerHTML = notes;
    // td4.innerHTML = date;
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    // trow.appendChild(td1);
    // trow.appendChild(td2);
    // trow.appendChild(td3);
    // trow.appendChild(td4);

    var ControlDiv = document.createElement("div");
    ControlDiv.innerHTML = '<button type="button" class="btn btn-success my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick = "FillTboxes(' + userNo + ')">Edit Note</button>'

    trow.appendChild(ControlDiv);
    tbody.appendChild(trow);


}

selectAllData();

const userId = document.getElementById('userId');
const title = document.getElementById('title');
const notes = document.getElementById('notes');
const date = document.getElementById('date');

const BtnmodUpd = document.getElementById('UpdModBtn');
const BtnmodDel = document.getElementById('DelModBtn');



function FillTboxes(index) {
    if (index == null) {
        userId.value = "";
        title.value = "";
        notes.value = "";
        date.value = "";
        BtnmodUpd.style.display = 'none';
        BtnmodDel.style.display = 'inline-block';
    } else {
        --index;
        userId.value = userList[index][0];
        title.value = userList[index][1];
        notes.value = userList[index][2];
        date.value = userList[index][3];
        // title.value = userList[index][0];
        // notes.value = userList[index][1];
        // date.value = userList[index][2];
        BtnmodUpd.style.display = 'inline-block';
        BtnmodDel.style.display = 'inline-block';
    }
}

function AddNote() {
    //            firebase.database().ref("notes/" + userId.value).set({
    firebase.database().ref("todos/" + userId.value).set({
            title_: title.value,
            notes_: notes.value,
            date_: date.value,
        },
        (error) => {
            if (error) {
                alert('Failed Add the Note');
            } else {
                alert('Add Note successfully');
                selectAllData();
                $("#exampleModalCenter").modal("hide");

            }
        }
    )
}

function UpdNote() {
    //            firebase.database().ref("notes/" + userId.value).update({
    firebase.database().ref("todos/" + userId.value).update({
            userId_: userId.value,
            title_: title.value,
            notes_: notes.value,
            date_: date.value,
        },
        (error) => {
            if (error) {
                alert('Failed Update the Note');
            } else {
                alert('Note update successfully');
                selectAllData();
                window.open("seeNotes.html", "_self")

            }
        }
    )
}

function DelNote() {
    firebase.database().ref("todos/" + userId.value).remove().then(
        function() {
            alert('Note Delete successfully');
            selectAllData();
            window.open("seeNotes.html", "_self")
                //                    $("#exampleModalCenter").modal("hide");


        }
    )
}