import {useGlobalContext} from '../context';

const Favorites = () => {
  const {favorites, selectMeal, removeFromFavorite} = useGlobalContext();
  return (
    <section className='favorites'>
      <div className='favorites-content'>
        <h5>Favorites</h5>
        <div className='favorites-container'>
          {favorites.map((item) => {
            console.log(item);
            const {idMeal, strMealThumb: image} = item;
            return (
              <div key={idMeal} className='favorites-item'>
                <img src={image} className='img favorites-img' onClick={() => selectMeal(idMeal, true)}/>
                <button className='remove-btn' onClick={() => removeFromFavorite(idMeal)}>Remove</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
