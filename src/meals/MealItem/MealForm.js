import { useState } from 'react';
import classes from './MealForm.module.css';

const MealForm = (props) => {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addHandler(+amount);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.input}>
        <label htmlFor={props.id}>Amount</label>
        <input
          id={'amount_' + props.id}
          type="number"
          step={1}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button>+ Add</button>
    </form>
  );
};

export default MealForm;
