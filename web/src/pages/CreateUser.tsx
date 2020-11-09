import React, { FormEvent, useState,  } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

import api from '../services/api';

import '../styles/pages/createUser.css';

function CreateUser() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleToCreateUserConfirmed(event: FormEvent) {
    event.preventDefault();

    if (!name || !email || !password || !address ) return alert('Por favor prencha todos os campos');

    if (email !== confirmEmail) return;

    if (password !== confirmPassword) return;

    const data = {
      name,
      email,
      address,
      password,
    }

    try {
      const response = await api.post('/register', data);

      history.push({
        pathname: '/landing/user/confirmed',
        search: '?u=ok',
        state: response.data.user
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="page-create-user"> 
      <Sidebar active={false} />

      <main>
        <form onSubmit={handleToCreateUserConfirmed} className="create-user-form">
          <fieldset>
            <legend>Cadastrar novo usuário</legend>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name" 
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <input
                id="address"
                value={address}
                onChange={event => setAddress(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="confirm-email">Confirmar Email</label>
              <input
                id="confirm-email"
                value={confirmEmail}
                onChange={event => setConfirmEmail(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="confirm-password">Confirmar Senha</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
              />
            </div>
            <button type="submit">
              Confirmar
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default CreateUser;