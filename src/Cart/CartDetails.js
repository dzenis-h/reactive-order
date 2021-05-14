import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './CartDetails.module.css';
import CartContext from '../store/cart-context';
import CartItem from './Cart';

const CartDetails = (props) => {
  const ctx = useContext(CartContext);

  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctx.items.map((i) => {
        return (
          <CartItem
            name={i.name}
            price={i.price}
            amount={i.amount}
            onRemove={cartItemRemoveHandler.bind(null, i.id)}
            onAdd={cartItemAddHandler.bind(null, i)}
          />
        );
      })}
    </ul>
  );

  return (
    <div>
      <Modal>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span className={classes.total}>{ctx.totalAmount.toFixed(2)}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </Modal>
      )
    </div>
  );
};

export default CartDetails;
