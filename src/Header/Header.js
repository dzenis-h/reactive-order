import React, { Fragment } from 'react';
import mealsImg from '../assets/meals.jpg';
import classes from './Header.module.css';
import CartItem from '../Header/CartItem';

export default function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactiveMeals</h1>
        <div onClick={props.onOpen}>
          <CartItem />
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt="ReactiveMeals" />
      </div>
    </Fragment>
  );
}
