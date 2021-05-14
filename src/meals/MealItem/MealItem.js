import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import MealForm from './MealForm';
import CartContext from '../../store/cart-context';

export default function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;

  const ctx = useContext(CartContext);

  const addHandler = (amount) => {
    ctx.addItem({
      id: props.id,
      amount,
      name: props.name,
      description: props.description,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealForm addHandler={addHandler} />
      </div>
    </li>
  );
}
