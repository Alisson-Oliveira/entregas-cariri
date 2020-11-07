import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

import '../styles/pages/createPurchase.css';

function CreatePurchase() {
  return (
    <div id="page-create-purchase">
      <Sidebar active={false} />
      <main>
        <form className="create-purchase-form">
          <fieldset>
            <legend>Novo pedido</legend>
            <div className="purchase-block">
              <strong>Pedido Nº</strong>
              <span>1-0601120202238</span>
            </div>
            <div className="input-block">
              <label htmlFor="purchase-list">Lista de Pedidos</label>
              <textarea
                id="purchase-list" 
              />
            </div>
            <Link to='/landing/purchase/confirmed'>
              Confirmar
            </Link>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default CreatePurchase;