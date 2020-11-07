import React from 'react';

import Sidebar from '../components/Sidebar';

import '../styles/pages/createUser.css';

function CreateUser() {
  return (
    <div id="page-create-user"> 
      <Sidebar active={false} />

      <main>
        <form className="create-user-form">
          <fieldset>
            <legend>Cadastrar novo usuário</legend>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name" 
              />
            </div>
            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <input
                id="address" 
              />
            </div>
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input
                id="email" 
              />
            </div>
            <div className="input-block">
              <label htmlFor="confirm-email">Confirmar Email</label>
              <input
                id="confirm-email" 
              />
            </div>
            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
              />
            </div>
            <div className="input-block">
              <label htmlFor="confirm-password">Confirmar Senha</label>
              <input
                id="confirm-password"
                type="password"
              />
            </div>
            <button type="button">
              Confirmar
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default CreateUser;