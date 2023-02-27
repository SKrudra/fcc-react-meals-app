import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(favorites);
  } else {
    favorites = [];
  }
  return favorites;
};

const AppProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

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

  // Open the modal with deatils
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // Set favorites
  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) {
      return;
    }
    const newFavorite = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        favorites,
        addToFavorites,
        removeFromFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export {AppContext, AppProvider};

// https://randomuser.me/api
// https://www.themealdb.com/api.php
