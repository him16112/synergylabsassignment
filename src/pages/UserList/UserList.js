import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './userList.css';
import EditUserModal from "../../components/EditUserModal"; // Import the EditUserModal component
import { Button } from "@mui/material"; // Import Button from MUI
import { deleteUser } from '../../utils/deleteUser'; // Import deleteUser function
import Navbar from "../../components/navbar/Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState({}); // For storing validation errors
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch user data from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle open modal for editing user
  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user to edit
    setOpenEdit(true); // Open the edit modal
  };

  // Handle close modal for editing
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUser(null); // Clear selected user
  };

  // Handle view user details
  const handleView = (userId) => {
    navigate(`/userdetails/${userId}`); // Navigate to the user details page
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar setUsers={setUsers} setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm here */}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.street}, {user.address.city}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="button-container"> {/* Add button container */}
                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => deleteUser(user.id, setUsers, users)}>
                      Delete
                    </Button>
                    <Button variant="contained" color="info" onClick={() => handleView(user.id)}>
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      <EditUserModal 
        open={openEdit} 
        onClose={handleCloseEdit} 
        selectedUser={selectedUser} 
        setUsers={setUsers} // Pass down setUsers
        error={error} 
      />
    </div>
  );
};

export default UserList;
