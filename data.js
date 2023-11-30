
var form = document.querySelector('#form');
form.addEventListener('submit', store);

function store(e) {
    e.preventDefault();
    var fname = document.querySelector('#fname').value;
    var lname = document.querySelector('#lname').value;
    var email = document.querySelector('#email').value;

    const Person = {
        fname,
        lname,
        email,
    };

    axios.post("https://crudcrud.com/api/d208596f74934f0a89d89e2a864fcba7/AppointmentData", Person)
        .then((response) => {
            showUsers(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/d208596f74934f0a89d89e2a864fcba7/AppointmentData")
        .then((response) => {
            showUsers(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

function showUsers(data) {
    var usersList = document.getElementById('usersList');
    usersList.innerHTML = '';

    if (data !== null) {
        data.forEach(function (Person, index) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(Person.fname + '  ' + Person.lname + ' - ' + Person.email + '  '));

            var Edit = document.createElement('button');
            Edit.appendChild(document.createTextNode('EDIT'));
            li.appendChild(Edit);
            Edit.onclick = function () {
                editUser(index, data);
            };

            var deleteBtn = document.createElement('button');
            deleteBtn.appendChild(document.createTextNode(' X '));
            deleteBtn.onclick = function () {
                deleteUser(index, data);
            };
            li.appendChild(deleteBtn);

            usersList.appendChild(li);
        });
    }
}

function deleteUser(index, data) {
    var userId = data[index]._id; 
    axios.delete(`https://crudcrud.com/api/d208596f74934f0a89d89e2a864fcba7/AppointmentData/${userId}`)
        .then((response) => {
            showUsers(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function editUser(index, data) {
    var userId = data[index]._id; 
    var user = data[index];

    var newfname = prompt('Enter new fname', user.fname);
    var newlname = prompt('Enter new lname', user.lname);
    var newemail = prompt('Enter new mail', user.email);

    if (newfname && newlname && newemail) {
        user.fname = newfname;
        user.lname = newlname;
        user.email = newemail;

        axios.put(`https://crudcrud.com/api/d208596f74934f0a89d89e2a864fcba7/AppointmentData/${userId}`, user)
            .then((response) => {
                showUsers(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}