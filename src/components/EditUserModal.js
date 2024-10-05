// EditUserModal.js
import React, { useEffect, useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";

const EditUserModal = ({ open, onClose, selectedUser, setUsers, error }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser); // Set local state to selected user when modal opens
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update local state
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    // Perform PUT request to simulate updating the user
    fetch(`https://jsonplaceholder.typicode.com/users/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Use local state for submission
    })
    .then((response) => response.json())
    .then((updatedUserResponse) => {
      // Update the user in the state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUserResponse.id ? updatedUserResponse : user
        )
      );
      onClose(); // Close edit modal after saving
    })
    .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>Edit User</h2>
        {selectedUser && (
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name || ''} // Use local state
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!error.name}
              helperText={error.name}
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username || ''} // Use local state
              fullWidth
              margin="normal"
              inputProps={{ readOnly: true }} // Make username read-only
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email || ''} // Use local state
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!error.email}
              helperText={error.email}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone || ''} // Use local state
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!error.phone}
              helperText={error.phone}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Save Changes
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default EditUserModal;
