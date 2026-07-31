import { useEffect, useState } from "react";
import API from "../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      const list = res.data.data || (Array.isArray(res.data) ? res.data : []);
      setUsers(list);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      alert("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
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
            <th>Action</th>
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
              <td>
                {user.role !== "admin" && (
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{
                      background: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;