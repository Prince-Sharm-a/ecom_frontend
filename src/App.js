// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { Wishlist } from './Pages/Wishlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/wishlist' element={<Wishlist />} />
    </Routes>
  );
}

export default App;
