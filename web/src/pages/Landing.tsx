import React from 'react';

import LandingConfirmed from '../components/LandingConfirmed';

interface LandingProps {
  type: string,
}

function Landing(props: LandingProps) {
  return (
    <>
      {
        props.type === 'purchase' ? (
          <LandingConfirmed 
            title="Obrigado por efetuar um pedido."
            subtitleOne="Fique atento a sua compra, será emitido uma nota fiscal para você acompanhar seu pedido em tempo real."
            subTitleTwo="Ou entre em contato com o entregado!"
          />
        ) : (
          <LandingConfirmed 
            title="Obrigado por se cadastrar em nossa plataforma."
            subtitleOne="Buscamos facilitar para você todas as suas compras em supermercado."
            subTitleTwo="Estamos juntos nessa nova jornada!"
          />
        )
      }
    </>
  );
} 

export default Landing;