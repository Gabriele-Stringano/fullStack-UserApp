import React from 'react'
import DashBoardCSS from './modules/DashBoard.module.css';
import imageCodingProgress from '../images/coding-progress.png';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function DashBoard() {
    return (
        <div className={DashBoardCSS.container}>
          <img src={imageCodingProgress} alt="Immagine" className={DashBoardCSS.image} />
          <h1 className={DashBoardCSS.title}>Sorry, this section is not yet available</h1>
          <Button variant="contained" component={Link} to={'/profile'} >
                Your Profile
          </Button>
        </div>
      );
    }
