import React from 'react';
import FooterCSS from '../modules/Footer.module.css';
import linkedin from '../../images/linkedin-logo.png'
import github from '../../images/github-logo.png'

export function Footer () {
  return (
    <footer className= {FooterCSS.footer}>
      <div className= {FooterCSS.leftSide}>
        <p>Powered by Gabriele Stringano</p>
      </div>
      <div className= {FooterCSS.rightSide}>
        <a href="https://www.linkedin.com/in/gabriele-stringano/" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="LinkedIn logo" />
        </a>
        <a href="https://github.com/Gabriele-Stringano/react_vegetarian_recipe" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="GitHub logo" />
        </a>
      </div>
    </footer>
  );
};