import React, { useEffect, useState } from 'react';
import classes from './MealsList.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import axios from 'axios';

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  const getMeals = async () => {
    try {
      const { data } = await axios.get(
        'https://meals-data-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      );

      const array = [];
      for (const key in data) {
        array.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(array);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  if (error) {
    return <h4 className={classes.error}>{error}</h4>;
  }

  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {meals.length > 0 ? (
            meals.map((m) => {
              return (
                <MealItem
                  key={m.id}
                  id={m.id}
                  name={m.name}
                  description={m.description}
                  price={m.price}
                />
              );
            })
          ) : (
            <p>Loading ...</p>
          )}
        </ul>
      </Card>
    </div>
  );
}

export default MealsList;
