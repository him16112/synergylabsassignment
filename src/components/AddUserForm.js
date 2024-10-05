import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const AddUserForm = ({ handleClose, setUsers }) => {
  const [user, setUser] = useState({
    name: '',
    username: 'USER-', // Username auto-filled
    email: '',
    address: {
      street: '',
      city: '',
    },
    phone: '',
    website: '',
    company: {
      name: '',
    },
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let tempErrors = {};
    if (user.name.length < 3) tempErrors.name = 'Name must be at least 3 characters.';
    if (!user.email.includes('@')) tempErrors.email = 'Email must be valid.';
    if (user.phone.length < 10) tempErrors.phone = 'Phone number must be at least 10 digits.';
    if (user.address.street === '') tempErrors.street = 'Street is required.';
    if (user.address.city === '') tempErrors.city = 'City is required.';
    if (user.company.name && user.company.name.length < 3) tempErrors.companyName = 'Company name must be at least 3 characters.';
    if (user.website && !user.website.startsWith('http')) tempErrors.website = 'Must be a valid URL.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Prepare user data to match the desired format
      const newUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
          street: user.address.street,
          city: user.address.city,
        },
        phone: user.phone,
        website: user.website,
        company: {
          name: user.company.name,
        },
      };

      // Make POST request to simulate creating a user
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log('New user created:', data);
      
      // Update users state with new user
      setUsers(prevUsers => [...prevUsers, { ...data, id: prevUsers.length + 1 }]);
      handleClose(); // Close drawer after success
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setUser({ ...user, address: { ...user.address, [addressField]: value } });
    } else if (name.startsWith('company.')) {
      const companyField = name.split('.')[1];
      setUser({ ...user, company: { ...user.company, [companyField]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Add New User</Typography>
      <TextField
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        helperText={errors.name}
        error={!!errors.name}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        helperText={errors.email}
        error={!!errors.email}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Phone"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        helperText={errors.phone}
        error={!!errors.phone}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Username"
        name="username"
        value={user.username}
        disabled
        fullWidth
        margin="normal"
      />
      <TextField
        label="Street"
        name="address.street"
        value={user.address.street}
        onChange={handleChange}
        helperText={errors.street}
        error={!!errors.street}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="City"
        name="address.city"
        value={user.address.city}
        onChange={handleChange}
        helperText={errors.city}
        error={!!errors.city}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Company Name"
        name="company.name"
        value={user.company.name}
        onChange={handleChange}
        helperText={errors.companyName}
        error={!!errors.companyName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Website"
        name="website"
        value={user.website}
        onChange={handleChange}
        helperText={errors.website}
        error={!!errors.website}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Add User
      </Button>
    </form>
  );
};

export default AddUserForm;
