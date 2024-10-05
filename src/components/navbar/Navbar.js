import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, TextField } from '@mui/material';
import AddUserForm from '../AddUserForm'; // Import the form

const Navbar = ({ setUsers, setSearchTerm }) => { // Accept setUsers and setSearchTerm as props
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SynergyLabs
          </Typography>
          <TextField
            label="Search User"
            variant="outlined"
            size="small"
            onChange={handleSearchChange} // Handle search input changes
            style={{ marginRight: '20px', backgroundColor: 'white' }} // Style as needed
          />
          <Button color="inherit" onClick={handleDrawerOpen}>
            Add User
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer for Adding User */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 400, padding: 20 }}>
          <AddUserForm handleClose={handleDrawerClose} setUsers={setUsers} /> {/* Pass setUsers here */}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
