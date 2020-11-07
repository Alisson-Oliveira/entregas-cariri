import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import Sidebar from '../components/Sidebar';
import Purchase from '../components/Purchase';

import '../styles/pages/panelUser.css';

interface PurchaseProps {
  id: number,
  number: string,
  state: string,
  list: string,
}

function PanelUser() {
  const [purchases, setPurchases] = useState<PurchaseProps[]>([]);

  return (
    <div id="page-panel-user">
      <Sidebar active={true}> Alisson Oliveira </Sidebar>
      <article>
        <header>
          <strong>Lista de Pedidos</strong>
          {
            purchases.length !== 0 ? (
              <div className="purchases-state">
                <span>Em andamento: 0</span>
                <span>Entregues: 0</span>
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
                  purchaseNumber={purchase.number}
                  PurchaseState={purchase.state}
                  PurchaseList={purchase.list}
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
          <Link to="/create/purchase">
            <FiArrowRight size={26} color="#FFFFFF" />
          </Link>
        </footer>
      </article>
    </div>
  );
}

export default PanelUser;