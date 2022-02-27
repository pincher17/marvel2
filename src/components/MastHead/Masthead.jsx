import React from 'react';
import s from './MastHead.module.css';

const Masthead = (props) =>{
  
return (
  <div className={s.background}>
  <div className={s.headline}>
    <span className={s.headline_item}>{props.head}</span>
  </div>
</div>
  )
}


export default Masthead;
