import Movies from './Movies';
import Search from './Search';
// import { AppContext } from './context';
import { useGlobalContext } from './context';

const Home = () => {
    return (
    <>
        <Search />
        <Movies />
    </>
  )
}

export default Home;
