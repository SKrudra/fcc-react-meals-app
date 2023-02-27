import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';
import {useGlobalContext} from './context';

function App() {
  const {showModal, favorites} = useGlobalContext();
  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;

// props/state management
// in small projects we can work with just props in a props-drilling feshion, by passing them down the child components
// or we can use Context API to centralize that logic to avoid props-drilling in a small to medium project
// for large scale project it's better to use third party state management like Redux, Redux-Toolkit, etc.

// https://react-icons.github.io/react-icons
