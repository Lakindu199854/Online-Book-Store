import logo from "./logo.svg";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Help from "./pages/Help";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Users from "./pages/Users";
import Checkout from "./pages/Checkout";
import Login from "./pages/AuthPages/Login"
import Register from "./pages/AuthPages/Register"
// import BookDetail from './pages/BookDetail'; // Import the BookDetail component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Users />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<Users/>}/>  */}
          <Route path="/home" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/book" element={<Book />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category" element={<Category />} />
          <Route path="/book/:bookId" element={<Book />} />{" "}
          {/* Updated route to accept bookId */}
          <Route path="/help/:categoryId" element={<Help />} />
          <Route path="/cart/:bookId" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
