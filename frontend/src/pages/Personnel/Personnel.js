import React, { useState, useEffect } from "react";

const UsersListPage = ({ session }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    session.get("users").then((resp) => {
      if (resp.status === 200) {
        setUsers(resp.data._embedded.users);
      }
    });
  });


  return (
    <>
      <table class="table" it = "sortTable">
        <thead>
          <tr>
            <th scope="col">
              Username
            </th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={row.username}>
              <th>{row.username}</th>
              <td>{row.firstName + " " + row.lastName}</td>
              <td>{row.role}</td>
              <td>{"Contact information here probably. "}</td>
              <td>{"Contact information here probably. "}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersListPage;
