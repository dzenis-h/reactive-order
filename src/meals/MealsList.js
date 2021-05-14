import React from 'react';
import { DUMMY_MEALS } from '../assets/dummy-data';
import classes from './MealsList.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function MealsList() {
  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((m) => {
            return (
              <MealItem
                key={m.id}
                id={m.id}
                name={m.name}
                description={m.description}
                price={m.price}
              />
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

export default MealsList;
