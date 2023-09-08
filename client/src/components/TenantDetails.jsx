import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function TenantDetails() {
  const { userInfo } = useSelector((state) => state.auth);
  const [allotments, setAllotments] = useState([]);
  const [filteredAllotments, setFilteredAllotments] = useState([]);

  useEffect(() => {
    const fetchAllotments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getOccupants');
        if (response.status === 200) {
          setAllotments(response.data);
        } else {
          console.error('Failed to fetch allotments');
        }
      } catch (error) {
        console.error('Error fetching allotments:', error);
      }
    };

    fetchAllotments();
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    const filtered = allotments.filter((allotment) => allotment.userId === userInfo._id);
    setFilteredAllotments(filtered);
  }, [allotments, userInfo._id]);

  return (
    <div>
      <h1>His details</h1>
      {userInfo._id}

      {/* Display filtered allotments */}
      <div>
        <h2>Occupant Details</h2>
        {filteredAllotments.map((allotment) => (
          <div key={allotment._id}>
            <p>Sharing Type: {allotment.sharingtype}</p>
            <p>Price: {allotment.price}</p>
            <p>UserID: {allotment.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
