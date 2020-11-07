import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import SorrisoImg from '../images/sorriso.svg';
import LogoSmallImg from '../images/logo-small.svg';

import '../styles/components/landingConfirmed.css';

interface LandingConfirmedProps {
  title: string,
  subtitleOne: string,
  subTitleTwo: string,
}

function LandingConfirmed(props: LandingConfirmedProps) {
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
            <Link to="/panel">
              <FiArrowRight size={26} color="#FFFFFF" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingConfirmed;