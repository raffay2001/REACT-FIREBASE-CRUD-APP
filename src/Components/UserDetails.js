import React from "react";
import './UserDetails.css';

function UserDetails(props) {

  const editUserHandler = (event, user) => {
    props.editUser(user);
  }

  const deleteUserHandler = (event, user) => {
    props.deleteUser(user);
  }

  return <div className="user-details">
    <table className="users-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Date Of Birth</th>
          <th>Gender</th>
          <th>Country</th>
          <th>City</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(
          (user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}{" "}{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>{user.gender}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
                <td>
                  <button className="btn btn-primary" onClick={(event) => {editUserHandler(event, user);}}>Edit</button>
                  <button className="btn btn-danger" onClick={(event) => {deleteUserHandler(event, user);}}>Delete</button>
                </td>
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  </div>
}

export default UserDetails;