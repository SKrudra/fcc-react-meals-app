import {useGlobalContext} from '../context';
import {BsHandThumbsUp} from 'react-icons/bs';

const Meals = () => {
  const {loading, meals, selectMeal} = useGlobalContext();
  if (loading) {
    return (
      <section className='section'>
        <h4>Loading...</h4>
      </section>
    );
  }
  if (meals.leangth < 1) {
    return (
      <section className='section'>
        <h4>No meals matched your criteria. Please try something else.</h4>
      </section>
    );
  }
  return (
    <section className='section-center'>
      {meals.map((singleMeal) => {
        const {idMeal: id, strMeal: title, strMealThumb: image} = singleMeal;
        return (
          <article key={id} className='single-meal'>
            <img src={image} alt='meal' className='img' onClick={() => selectMeal(id)} />
            <footer>
              <h5>{title}</h5>
              <button className='like-btn'>
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
