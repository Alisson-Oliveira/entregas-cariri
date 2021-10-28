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
  const [waitList, setWaitList] = useState(0);
  const [currenty, setCurrenty] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const location = useLocation();
  
  async function getUserPurchasesDetails() {
    const userData = location.state as UserState;
    if (!userData) return ;

    setUser(userData);

    let res = await api.get(`/purchases/${userData.id}`);
    const data = res.data;

    setPurchases(data.reverse());
    
    res = await api.get(`/purchases/details/${userData.id}`);

    setWaitList(res.data.waitList);
    setCurrenty(res.data.currenty);
    setCompleted(res.data.completed);
    setCanceled(res.data.canceled);
  }

  useEffect(() => {
    getUserPurchasesDetails()
  }, [location.state, purchases]);

  function statePurchase(state: string) {
    var stateResult = true;

    stateResult = state !== 'Concluído';

    if (!stateResult) return false;

    stateResult = state !== 'Cancelado';
    
    if (!stateResult) return false;

    return stateResult;
  }

  return (
    <div id="page-panel-user">
      <Sidebar active={true} children={user?.name} />
      <article>
        <header>
          <strong>Lista de Pedidos</strong>
          {
            purchases.length !== 0 ? (
              <>
                <div className="purchases-state">
                  <span>Lista de Espera: {waitList} </span>
                  <span>Concluídos: {completed}</span>
                </div>
                <div className="purchases-state">
                  <span>Em andamento: {currenty} </span>
                  <span>Cancelados: {canceled}</span>
                </div>
              </>
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
                  purchaseId={purchase.id}
                  purchaseNumber={purchase.purchaseNumber}
                  purchaseState={purchase.state}
                  purchaseList={purchase.purchaseList}
                  purchaseCompleted={statePurchase(purchase.state)}
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
