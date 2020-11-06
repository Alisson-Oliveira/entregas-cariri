import React from 'react';
import { FiLogIn, FiPlus } from 'react-icons/fi';

import '../styles/pages/login.css';

function Login() {
  return (
    <div id="page-login">
      <div className="content-wrapper">
        <main>
          <h1> Entregas Cariri </h1>
          <p> Faça suas compras do conforto da sua casa. </p>
        </main> 
        <form className="content-login-form">
          <div className="content-block">
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input id="email" />
            </div> 
            <div className="input-block">
              <label htmlFor="password">Password</label>
              <input id="password" />
            </div>
          </div>
          <div className="button-block">
            <button type="button"> 
              <FiLogIn size={26} color="#FFFFFF" /> 
            </button>
            <button type="button">
              <FiPlus size={26} color="#FFFFFF" />
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
}

export default Login;