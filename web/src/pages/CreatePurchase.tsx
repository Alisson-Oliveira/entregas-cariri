import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

import { formatDate, generatePurchaseNumber } from '../utils/utils';

import '../styles/pages/createPurchase.css';

import api from '../services/api';

interface UserState {
  id: number,
  name: string,
  address: string,
  email: string,
}

function CreatePurchase() {
  const [user, setUser] = useState<UserState>();
  const [purchaseNumber, setPurchaseNumber] = useState('');
  const [purchaseList, setPurchaseList] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const userData = location.state as UserState;

    const timestamp = formatDate(Date.now());
    if (!userData) return ;

    setUser(userData);

    const genereteNumber = generatePurchaseNumber(userData.id, timestamp);

    setPurchaseNumber(genereteNumber);
  }, [location.state]);

  async function handleToPurchaseConfirmed(event: FormEvent) {
    event.preventDefault();

    if (!purchaseList) return alert('Por favor prencha todos os campos');

    if (!user?.id) return alert('ID invalid')

    const data = {
      purchaseNumber,
      state: 'Lista de Espera',
      purchaseList,
      id: user?.id,
    }

    try {
      await api.post('/purchases/purchase', data);

      history.push({ 
        pathname: '/landing/purchase/confirmed',
        search: '?p=ok',
        state: user
      });
    } catch (error) {
      return alert('Não foi possível efetuar seu pedido.');
    }
  }

  return (
    <div id="page-create-purchase">
      <Sidebar active={false} />
      <main>
        <form onSubmit={handleToPurchaseConfirmed} className="create-purchase-form">
          <fieldset>
            <legend>Novo pedido</legend>
            <div className="purchase-block">
              <strong>Pedido Nº</strong>
              <span>{purchaseNumber}</span>
            </div>
            <div className="input-block">
              <label htmlFor="purchase-list">Lista de Pedidos</label>
              <textarea
                id="purchase-list" 
                value={purchaseList}
                onChange={event => setPurchaseList(event.target.value)}
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

export default CreatePurchase;