import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiPlus } from 'react-icons/fi';

import api from '../services/api';

import '../styles/pages/login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleToPanel(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('/authenticate', data);

      history.push({
        pathname: '/panel',
        search: `?u=${response.data.user.id}`,
        state: response.data.user
      });
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <div id="page-login">
      <div className="content-wrapper">
        <main>
          <h1> Entregas Cariri </h1>
          <p> Faça suas compras do conforto da sua casa. </p>
        </main> 
        <form onSubmit={handleToPanel} className="content-login-form">
          <div className="content-block">
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                value={email} 
                onChange={event => setEmail(event.target.value)} 
              />
            </div> 
            <div className="input-block">
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                value={password} 
                onChange={event => setPassword(event.target.value)} 
              />
            </div>
          </div>
          <div className="button-block">
            <button type="submit"> 
              <FiLogIn size={26} color="#FFFFFF" /> 
            </button>
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