import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import SorrisoImg from '../images/sorriso.svg';
import LogoSmallImg from '../images/logo-small.svg';

import '../styles/components/landingConfirmed.css';

interface LandingConfirmedProps {
  title: string,
  subtitleOne: string,
  subTitleTwo: string,
}

interface UserState {
  id: number,
  name: string,
  address: string,
  email: string,
}

function LandingConfirmed(props: LandingConfirmedProps) {
  const [user, setUser] = useState<UserState>();
  const location = useLocation();

  useEffect(() => {
    const userData = location.state as UserState;
    if (!userData) return ;

    setUser(userData);
  }, [location.state]);

  return (
    <div id="page-landing-confirmed">
      <div className="content-landing">
        <div className="content-titles">
          <h1>{props.title}</h1>
          <h2>{props.subtitleOne}</h2>
          <h2>{props.subTitleTwo}</h2>
        </div>
        <div className="content-images">
          <img src={SorrisoImg} alt="Sorriso" />
          <div className="content-images-block">
            <img src={LogoSmallImg} alt="Entregas Cariri" />
            <Link to={{
              pathname: '/panel',
              search: `?u=${user?.id}`,
              state: user
            }}>
              <FiArrowRight size={26} color="#FFFFFF" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingConfirmed;