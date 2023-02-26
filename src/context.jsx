import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({children}) => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (url) => {
    try {
      const {data} = await axios.get(url);
      setMeals(data.meals);
    } catch (error) {
      console.error(error.response);
    }
  };
  useEffect(() => {
    fetchMeals(allMealUrl);
  }, []);
  return <AppContext.Provider value={{meals}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);

export {AppContext, AppProvider};

// https://randomuser.me/api
