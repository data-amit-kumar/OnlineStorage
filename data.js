var form = document.querySelector('#form');

form.addEventListener('submit', store);

function store(e){
    e.preventDefault();
    var fname= document.querySelector('#fname').value;
    var lname= document.querySelector('#lname').value;
    var email=document.querySelector('#email').value;
    
    const Person={
        fname,
        lname,
        email,
    };
    // if (localStorage.getItem('users') === null) {
    //     var users = [];
    //     users.push(Person);
    //     localStorage.setItem('users', JSON.stringify(users));
    //   } else {
    //     var storedUsers = JSON.parse(localStorage.getItem('users'));
    //     storedUsers.push(Person);
    //     localStorage.setItem('users', JSON.stringify(storedUsers));
    //   }
    axios.post("https://crudcrud.com/api/2ee49e7a59de4223911314684adae107/Appontmentdata", Person)
          .then((response)=>{
            showUsers(response.data);
          })
          .catch((err)=>{
            console.log(err)
          })
      // showUsers();
}

function showUsers() {
    var users = JSON.parse(localStorage.getItem('users'));
    var usersList = document.getElementById('usersList');
    usersList.innerHTML = '';

    if (users !== null) {
      users.forEach(function (Person, index) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(Person.fname + '  ' + Person.lname + ' - ' + Person.email+'  '));
        
        var Edit=document.createElement('button');
        Edit.appendChild(document.createTextNode('EDIT'));
        li.appendChild(Edit);
        Edit.onclick=function(){
          editUser(index);
        }

        var deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode(' X '));
        deleteBtn.onclick = function () {
          deleteUser(index);
        };
        li.appendChild(deleteBtn);

        usersList.appendChild(li);
      });
    }
  }

  function deleteUser(index) {
    var users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    showUsers();
  }

  function editUser(index){
    var users= JSON.parse(localStorage.getItem('users'));
    var user= users[index];

    var newfname=prompt('Enter new fname', user.fname);
    var newlname=prompt('Enter new lname',user.lname);
    var newemail= prompt('Enter new mail', user.email);

    if(newfname && newlname && newemail){
      user.fname=newfname;
      user.lname=newlname;
      user.email=newemail;
      users[index]=user;
      localStorage.setItem('users',JSON.stringify(users));
      showUsers();
    }

  }