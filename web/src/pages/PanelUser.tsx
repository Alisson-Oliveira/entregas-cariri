import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import Sidebar from '../components/Sidebar';
import Purchase from '../components/Purchase';

import '../styles/pages/panelUser.css';
import api from '../services/api';

interface PurchaseProps {
  id: number,
  purchaseNumber: string,
  purchaseList: string,
  state: string,
}

interface UserState {
  id: number,
  name: string,
  address: string,
  email: string,
}

function PanelUser() {
  const [user, setUser] = useState<UserState>();
  const [purchases, setPurchases] = useState<PurchaseProps[]>([]);
  const [currenty, setCurrenty] = useState(0);
  const [completed, setCompleted] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const userData = location.state as UserState;
    if (!userData) return ;

    setUser(userData);

    api.get(`/purchases/${userData.id}`).then(response => {
      setPurchases(response.data);
    })

    api.get(`/purchases/currentycompleted/${userData.id}`).then(response => {
      setCurrenty(response.data.currenty);
      setCompleted(response.data.completed);
    })

  }, [location.state]);

  return (
    <div id="page-panel-user">
      <Sidebar active={true} children={user?.name} />
      <article>
        <header>
          <strong>Lista de Pedidos</strong>
          {
            purchases.length !== 0 ? (
              <div className="purchases-state">
                <span>Em andamento: {currenty} </span>
                <span>Entregues: {completed}</span>
              </div>
            ) : (
              <div></div>
            )
          }
        </header>
        <main>
          {
            purchases.length !== 0 ? (
              purchases.map(purchase => (
                <Purchase 
                  key={purchase.id}
                  purchaseNumber={purchase.purchaseNumber}
                  PurchaseState={purchase.state}
                  PurchaseList={purchase.purchaseList}
                />  
              ))
            ) : (
              <div className="purchases-without">
                Você não possui nenhuma compra. :(
              </div>
            )
          }
        </main>
        <footer>
          <span>Faça uma compra agora mesmo :)</span>
          <Link to={{
              pathname: '/create/purchase',
              state: user
            }}
          >
            <FiArrowRight size={26} color="#FFFFFF" />
          </Link>
        </footer>
      </article>
    </div>
  );
}

export default PanelUser;