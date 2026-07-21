import { useEffect, useState } from "react";
import API from "../services/api";

function ManageUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const res = await API.get("/auth/users");

      setUsers(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="manage-users-page">

    <h1>Manage Users</h1>

    <table className="users-table">

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>

      <tbody>

        {users.map((user) => (

          <tr key={user._id}>

            <td>{user.name}</td>

            <td>{user.email}</td>

            <td>

              <span
                className={
                  user.role === "admin"
                    ? "role-admin"
                    : "role-user"
                }
              >
                {user.role}
              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
);
}

export default ManageUsers;