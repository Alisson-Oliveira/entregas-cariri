import React from 'react';

import logoSmallImg from '../images/logo-small.svg';

import '../styles/pages/offline.css';

function Offline() {
  return (
    <div id="page-offline">
      <img src={logoSmallImg} alt="Entregas Cariri" />
      <h1>Error 404, page not fount.</h1>
    </div>
  );
}

export default Offline;