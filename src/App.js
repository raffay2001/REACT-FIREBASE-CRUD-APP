import React, { useState, useEffect } from 'react';
import UserForm from './Components/UserForm';
import './App.css';
import UserDetails from './Components/UserDetails';
import axios from 'axios';
import Loader from './Components/Loader';


function App() {
  let [showForm, setShowForm] = useState(false);
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState(null);
  let [editMode, setEditMode] = useState(false);
  let [userToEdit, setUserToEdit] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  function addUserHandler() {
    setEditMode(false);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false)
  }

  function onCreateUser(user) {

    // fetch('https://react-http-tutorial-1b90f-default-rtdb.firebaseio.com/users.json', {
    //   method: 'POST',
    //   body: JSON.stringify(user),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then((res) => {
    //   console.log(res);
    // });

    if (!editMode) {
      axios.post('https://react-http-tutorial-1b90f-default-rtdb.firebaseio.com/users.json', user)
        .then((res) => {
          console.log(res.data);
          fetchUsers();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }

    else {
      let id = userToEdit.id;
      axios.put(`https://react-http-tutorial-1b90f-default-rtdb.firebaseio.com/users/${id}.json`, user)
        .then((res) => {
          console.log(res.data);
          fetchUsers();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }

    setShowForm(false);



  }

  function fetchUsers() {
    setLoading(true);
    setErrorMessage(null);

    // fetch('https://react-http-tutorial-1b90f-default-rtdb.firebaseio.com/users.json', {
    //   method: 'GET'
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error('Something Went Wrong........');
    //     }
    //     let userData = [];
    //     let data = res.json();
    //     for (let key in data) {
    //       userData.push({ id: key, ...data[key] });
    //     }
    //     setUsers(userData);
    //     setLoading(false);
    //     return res.json();
    //   })
    //   .then((data) => {
    //     let userData = [];
    //     for (let key in data) {
    //       userData.push({ id: key, ...data[key] });
    //     }
    //     console.log(userData);
    //     setUsers(userData);
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message);
    //     setLoading(false);
    //   })

    // OR 


    axios.get('https://react-http-tutorial-1b90f-default-rtdb.firebaseio.com/users.json')
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        let userData = [];
        for (let key in data) {
          userData.push({ id: key, ...data[key] });
        }
        console.log(userData);
        setUsers(userData);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });

  }

  function editUser(user) {
    console.log(user);
    setUserToEdit(user);
    setEditMode(true);
    setShowForm(true);
  }

  function deleteUser(user) {
    let fullName = `${user.firstName} ${user.lastName}`;
    let deletionConfirmation = window.confirm(`Do You Want To Delete The User: ${fullName}`);
    if (deletionConfirmation) {
      console.log('User To Be Deleted: ', user);
      axios.delete(`https://react-http-tutorial-1b90f-default-rtdb.firebaseio.com/users/${user.id}.json`)
        .then((res) => {
          console.log(res);
          fetchUsers();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }

  return (
    <div>
      <div className='page-header'>
        <button className='btn btn-success' onClick={addUserHandler}>Add User</button>
        <button className='btn btn-normal' onClick={fetchUsers}>Get Users</button>
      </div>
      {
        (loading && !errorMessage) ? <Loader />
          : (!loading && errorMessage) ? <h2 style={{ textAlign: 'center' }}>{errorMessage}</h2>
            : <UserDetails users={users} editUser={editUser} deleteUser={deleteUser}></UserDetails>
      }
      {showForm && <UserForm closeForm={closeForm} onCreateUser={onCreateUser} editMode={editMode} user={userToEdit}></UserForm>}
    </div>
  );
}

export default App;
