import React, { useState, useEffect } from "react";

const UsersListPage = ({ session }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    session.get("users").then((resp) => {
      setUsers(resp.data._embedded.users);
    });
  });

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr>
              <th>{row.username}</th>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersListPage;
