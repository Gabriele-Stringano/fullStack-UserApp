import React from 'react'
import DashBoardCSS from './modules/DashBoard.module.css';
import imageCodingProgress from '../images/coding-progress.png';

export default function DashBoard() {
    return (
        <div className={DashBoardCSS.container}>
          <img src={imageCodingProgress} alt="Immagine" className={DashBoardCSS.image} />
          <h1 className={DashBoardCSS.title}>Sorry, this section is not yet available</h1>
        </div>
      );
    }
