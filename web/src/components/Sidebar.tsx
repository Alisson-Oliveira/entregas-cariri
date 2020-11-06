import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';

import '../styles/components/sidebar.css';

function Sidebar() {
  const [active, setActive] = useState(false);

  return (
    <header className="content-header">
      <Link to="/">
        <FiArrowLeft size={24} color="#0E3F5D" /> Voltar
      </Link>
      {
        active ? (
          <main className="content-user">
            <span>Alisson Oliveira</span>
            <Link to="/">
              Sair <FiLogOut size={24} color="#0E3F5D" />
            </Link>
          </main>
        ) : (<div> </div>)
      }
    </header> 
  ); 
}

export default Sidebar;