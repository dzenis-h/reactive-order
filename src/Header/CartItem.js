import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../assets/CartIcon';
import classes from './CartItem.module.css';
import CartContext from '../store/cart-context';

export default function CartItem(props) {
  const [isActive, setIsActive] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) return;
    setIsActive(true);
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const effect = `${classes.button} ${isActive ? classes.bump : ''}`;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={effect} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
