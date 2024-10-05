// UserDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './userDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBuilding, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  if (!user) {
    return <div className="loading">Loading user details...</div>;
  }

  return (
    <>
    <div className="user-details-container">
      <div className="user-details-card">
        <div className="card-header">
          <h2>{user.name}</h2>
          <h4>@{user.username}</h4>
        </div>
        <div className="card-content">
          <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {user.email}</p>
          <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> {user.phone}</p>
          <p><FontAwesomeIcon icon={faBuilding} /> <strong>Company:</strong> {user.company.name}</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
          <p><FontAwesomeIcon icon={faGlobe} /> <strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserDetails;
