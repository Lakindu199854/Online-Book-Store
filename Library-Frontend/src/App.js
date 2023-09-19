import logo from './logo.svg';

import { Routes,Route,BrowserRouter } from 'react-router-dom';

import Help from './pages/Help';
import Layout from './pages/Layout';
import Home2 from './pages/Home2';
import Book from './pages/Book';
import Cart from './pages/Cart';
import Category from './pages/Category'

// import BookDetail from './pages/BookDetail'; // Import the BookDetail component

function App() {
  
  return ( 
    <BrowserRouter>
      <Routes>      
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home2/>}/> 
          <Route path="/help" element={<Help/>}/> 
          <Route path="/book" element={<Book/>}/> 
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/book/:bookId" element={<Book/>} /> {/* Updated route to accept bookId */}
          <Route path="/help/:categoryId" element={<Help/>} />
          <Route path="/cart/:bookId" element={<Cart/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
