// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Cart, Wishlist, AuthLogin, Signup } from './Pages';

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
