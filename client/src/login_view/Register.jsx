import React from 'react'
import './Register.css'
import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Register = ({onLoginSuccess}) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [user,setuser]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [identifier, setIdentifier] = useState("");

  const handleModeSwitch = () => {
    setIsRegistering(!isRegistering);
    setuser("");
    setemail("");
    setpassword("");
    setIdentifier("");
  }
  const handleuser=async (e)=>{
    e.preventDefault();
    try{
      const endpoint = isRegistering ? '/register' : '/login';
      const payload=isRegistering?{
        name: user,//backend is expecting name not user.
        email:email, password:password
      } : {identifier,password}
      const url = `${API_BASE}${endpoint}`;
      console.log("Request to:", url);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      console.log("✅ It worked! Message from server:", data);
      if(endpoint==='/register'){
        alert("New user created. Welcome!")
      }
      else{
        if (response.ok) {
          alert("Logged in!");
          // Call the parent callback to update login state
          localStorage.setItem('token', data.token);
          if (typeof onLoginSuccess === 'function') {
            onLoginSuccess(identifier); // or onLoginSuccess(user) if you want to use username
          }
        } else {
        // Show error from server or a default message
        alert(data.message || "Invalid credentials");
      }
      }
    } 
    catch (err) {
      console.error("Error:", err);
      alert("Something went wrong! Server side.");
    }   
  }
  return (
    <div className='main-container'>
      <h2>{isRegistering? 'Register' : 'Login'}</h2>
      <form className='form-container' onSubmit={handleuser}>
        {isRegistering && (
          <div>
            <div className='form-group'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(e)=>{
                setuser(e.target.value);
              }}
              required
            />
            </div>

            <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              onChange={(e)=>{
                setemail(e.target.value);
              }}
              required
            />
            </div>
            </div> 

        )}
         
        {!isRegistering &&(
          <div>
            <div className='form-group'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="generic"
              name="username"
              minLength="5"
              maxLength="15"
              placeholder="Username/Email"
              onChange={(e)=>{
                setIdentifier(e.target.value);
              }}
              required
            />
            </div>

          </div>
        )}

        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="************"
            minLength="5"
            maxLength="15"
            onChange={(e)=>{
              setpassword(e.target.value);
            }}
            required
          />
        </div>

        <div className='button-group'>
          <button type="submit">
            {isRegistering ? 'Create User' : 'Login'}
          </button>
          <button type="button" onClick={handleModeSwitch}>
            {isRegistering
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </button>
          {!isRegistering && (
            <button type="button">Forgot Password</button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Register;
