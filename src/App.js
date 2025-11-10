// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { Wishlist } from './Pages/Wishlist';
import { AuthLogin } from './Pages/AuthLogin';
import { Signup } from './Pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/auth/login' element={<AuthLogin />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
