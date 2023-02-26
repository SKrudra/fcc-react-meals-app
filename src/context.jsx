import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const {data} = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error(error.response);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => fetchMeals(randomMealUrl);

  // on app load fetch all meals by default
  useEffect(() => {
    fetchMeals(allMealUrl);
  }, []);

  // fetch user typed meals
  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    fetchMeals(`${allMealUrl}${searchTerm}`);
  }, [searchTerm]);

  return <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);

export {AppContext, AppProvider};

// https://randomuser.me/api
// https://www.themealdb.com/api.php
