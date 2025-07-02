import React from 'react'
import './Profile.css'
import { useState, useEffect } from 'react';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const user_name = localStorage.getItem('username');
  const [email, setEmail] = useState(null);
  const [time_created, setTimeCreated] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      try {
        const res = await fetch(`${baseURL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email);
          setTimeCreated(data.created_at);
        }
      }
      catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
    fetchUser();
  }, []);
  return (
    <>
      <div className="profile-container">
        <h1>Profile</h1>
        <p>Name: {user_name}</p>
        <p>Email: {email}</p>
        <p>
          Joined: {time_created && new Date(time_created).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}
        </p>

      </div>
    </>
  )
}

export default Profile;