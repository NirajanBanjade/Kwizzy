import React from 'react'
import './Register.css'
import { useState } from 'react';

const Register = ({login}) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const handleModeSwitch = () => setIsRegistering(!isRegistering);
  return (
    <div className='main-container'>
      <h2>{isRegistering? 'Register' : 'Login'}</h2>
      <form className='form-container'>
        {isRegistering && (
          <div>
            <div className='form-group'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
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
              placeholder="Username/Email"
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
            minLength="8"
            maxLength="15"
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
