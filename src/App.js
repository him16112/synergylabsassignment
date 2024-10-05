import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList/UserList";
import UserDetails from "./pages/UserDetails/UserDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/userdetails/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
