// import React from 'react'

// const reducer = (state, action) => {

// }

// function Home() {
//   return (
//     <div id="main">
//       <section className='logout-section'>
//         <h2>Logged in successfully!</h2>
//         <p>Welcome username!</p>
//         <button className='logout-btn'>Logout</button>
//       </section>
//       <form className='login-form'>
//         {/* <p className='invalid-error'>Invalid username or password!</p> */}
//         <section className='username-input'>
//           <label>Username: </label>
//           <input type="text" placeholder='Username' className='username' />
//         </section>
//         <section className='password-input'>
//           <label>Password: </label>
//           <input type="password" placeholder='Password' className='password' />
//         </section>
//         <button className='login-btn'>Login</button>
//       </form>
//     </div>
//   )
// }

// export default Home
'use client'
import React, { useReducer, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, username: '', password: '' };
    default:
      return state;
  }
};

function Home() {
  const initialFormState = {
    username: '',
    password: '',
    isLoggedIn: false,
    showError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialFormState);
  const { username, password, isLoggedIn, showError } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      dispatch({ type: 'LOGIN_ERROR' });
    } else {
      dispatch({ type: 'LOGIN' });
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div id="main">
      {isLoggedIn ? (
        <section className='logout-section'>
          <h2>Logged in successfully!</h2>
          <p>Welcome {username}!</p>
          <button className='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </section>
      ) : (
        <form className='login-form' onSubmit={handleSubmit}>
          {showError && (
            <p className='invalid-error'>Invalid username or password!</p>
          )}
          <section className='username-input'>
            <label>Username: </label>
            <input
              type="text"
              placeholder='Username'
              className='username'
              name='username'
              value={username}
              onChange={handleInputChange}
            />
          </section>
          <section className='password-input'>
            <label>Password: </label>
            <input
              type="password"
              placeholder='Password'
              className='password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
          </section>
          <button className='login-btn' type='submit'>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;

