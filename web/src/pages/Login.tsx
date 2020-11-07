import React from 'react';
import { Link } from 'react-router-dom';

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
              <input id="password" type="password" />
            </div>
          </div>
          <div className="button-block">
            <Link to="/panel"> 
              <FiLogIn size={26} color="#FFFFFF" /> 
            </Link>
            <Link to="/create/user">
              <FiPlus size={26} color="#FFFFFF" />
            </Link>
          </div>
        </form>
      </div> 
    </div>
  );
}

export default Login;