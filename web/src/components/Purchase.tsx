import React from 'react';

import '../styles/components/purchase.css';

interface PurchaseProps {
  purchaseNumber: string,
  PurchaseState: string,
  PurchaseList: string,
}

function Purchase(props: PurchaseProps) {
  return (
    <section>
      <div className="purchase-block">
        <strong>Pedido Nº</strong>
        <span>{props.purchaseNumber}</span>
      </div>
      <div className="purchase-block">
        <strong>Status</strong>
        <span>{props.PurchaseState}</span>
      </div>
      <div className="purchase-list">
        <strong>Lista de Compras</strong>
        <p>{props.PurchaseList}</p>
      </div>
    </section>
  );
}

export default Purchase;