export const deleteUser = (userId, setUsers, users) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        // Update the user list after successful deletion
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    })
    .catch((error) => console.error("Error deleting user:", error));
  };