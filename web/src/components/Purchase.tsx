import React, { useEffect } from 'react';
import { useState } from 'react';
import api from '../services/api';

import '../styles/components/purchase.css';

interface PurchaseProps {
  purchaseId: number,
  purchaseNumber: string,
  purchaseState: string,
  purchaseList: string,
  purchaseCompleted: boolean,
}

function Purchase(props: PurchaseProps) {
  const [completed, setCompleted] = useState(false);
  const [canceled, setCanceled] = useState(false);

  async function fetchPurchaseState() {
    const res = await api.get(`/purchases/purchase/${props.purchaseId}`);
    const { state }  = res.data;
    
    const result = state === 'Concluído
        setCompleted(result)
        setCanceled(result)
  }

  useEffect(() => {
    try {
      fetchPurchaseState()
    } catch (error) {
      return alert(`Não foi possível verificar o states da sua compra`);
    }
  }, [props.purchaseId]);

  async function handlePurchaseCancel(id: number) {
    try {
      await api.put(`/purchase/canceled/${id}`);

      setCanceled(true);
      setCompleted(false);

      return alert('Seu pedido foi cancelado.');
    } catch (error) {
      console.log('Error Update purchase - ', error);

      return alert('Ocorreu algum erro no cancelamento da sua compra.');
    }
  }

  async function handlePurchaseCompleted(id: number) {
    try {
      await api.put(`/purchase/completed/${id}`);

      setCanceled(false);
      setCompleted(true);

      return alert('Seu pedido foi entrege.');
    } catch (error) {
      console.log('Error Update purchase - ', error);

      return alert('Ocorreu algum erro na confirmação da sua entrega.');
    }
  }

  return (
    <section>
      <div className="purchase-block">
        <strong>Pedido Nº</strong>
        <span>{props.purchaseNumber}</span>
      </div>
      <div className="purchase-block">
        <strong>Status</strong>
        <span>{props.purchaseState}</span>
      </div>
      <div className="purchase-list">
        <strong>Lista de Compras</strong>
        <p>{props.purchaseList}</p>
      </div>
      {
        props.purchaseCompleted ? (
          <div className="purchase-block">
            <button 
              type="button"
              onClick={() => handlePurchaseCancel(props.purchaseId)}
            >
              Cancelar
            </button>
              <>
                {
                  props.purchaseState !== 'Lista de Espera' ? (
                    <button 
                      type="button"
                      disabled={false}
                      onClick={() => handlePurchaseCompleted(props.purchaseId)}
                    >
                      Confirmar Entrega
                    </button>
                  ) : (
                    <button 
                      type="button"
                      className="purchase-wait-list"
                      disabled={true}
                      onClick={() => handlePurchaseCompleted(props.purchaseId)}
                    >
                      Confirmar Entrega
                    </button>
                  )
                }
              </>
          </div>
        ) : (
          <>
            { 
              completed ? (
                <div className ="purchase-completed">
                  Seu pedido foi entregue!
                </div>
              ) : (<div></div>)
            }
            {
              canceled ? (
                <div className ="purchase-canceled">
                  Seu pedido foi cancelado!
                </div>
              ) : (<div></div>)
            }
          </>
        ) 
      }
    </section>
  );
}

export default Purchase;
