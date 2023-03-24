import React from 'react'
import MemoCardCSS from './modules/MemoCard.module.css';

export default function MemoCard(props) {
    return (
        <div className={MemoCardCSS.card}>
          <div className={MemoCardCSS.cardHeader}>{props.title}</div>
          <div className={MemoCardCSS.cardBody}>{props.children}</div>
        </div>
      );
}
