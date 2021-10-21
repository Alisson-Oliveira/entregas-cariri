import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import logoSmailImg from '../images/logo-small.svg';
import '../styles/components/sidebar.css';
import { logout } from '../config/auth';

interface SidebarProps {
  active: boolean,
  children?: string,
}

function Sidebar(props: SidebarProps) {
  const { goBack } = useHistory();
  
  return (
    <header className="content-header">
      {
        props.active ? (
          <img src={logoSmailImg} alt="Entregas Cariri" />
        ) : (
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#0E3F5D" /> Voltar
          </button>
        )
      }
      {
        props.active ? (
          <main className="content-user">
            <span>{props.children}</span>
            <Link to="/" onClick={logout}>
              Sair <FiLogOut size={24} color="#0E3F5D" />
            </Link>
          </main>
        ) : (<div> </div>)
      }
    </header> 
  ); 
}

export default Sidebar
  
