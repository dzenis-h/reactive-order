import { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './CartDetails.module.css';
import CartContext from '../store/cart-context';
import CartItem from './Cart';
import Checkout from './Checkout';
import axios from 'axios';

const CartDetails = (props) => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);

  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const onConfirm = async (userData) => {
    setIsSubmitting(true);
    await axios.post(
      'https://meals-data-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        userData,
        order: ctx.items,
      }
    );
    // props.onClose();
    setIsSubmitting(false);
    setDidSubmit(true);
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

  const actions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button
          className={classes.button}
          onClick={() => setShow((prev) => !prev)}
        >
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span className={classes.total}>{ctx.totalAmount.toFixed(2)}</span>
      </div>
      {show && <Checkout onCancel={props.onClose} onConfirm={onConfirm} />}
      {!show && actions}
    </Fragment>
  );

  const submitting = (
    <Fragment>
      <p>Submitting Your Order.</p>
    </Fragment>
  );

  const submitted = (
    <div className={classes.actions}>
      <p style={{ textAlign: 'center' }}>Your order has been submitted.</p>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
    </div>
  );

  return (
    <Modal>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && submitting}
      {didSubmit && submitted}
    </Modal>
  );
};

export default CartDetails