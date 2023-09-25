
import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import { getAllCategories } from "./services/bookServices";
import '../pages/css/layout.css';


const Layout = () => {
  const [categories,setCategories]=useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  const loadItems =async ()=>{
    const res = await getAllCategories();
    setShowDropdown(!showDropdown); 
    console.log("res:" + res);
    await setCategories(res);
    res.map((category)=>{
      console.log(category);
    })
    return true;
    
  }

  return (
    <div>
     

      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home2">LIBRARY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home2">Home2</Nav.Link>
              <Nav.Link href="/category">Category</Nav.Link>


               <Dropdown show={showDropdown}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={loadItems}>
                  Categories
                </Dropdown.Toggle>
            
                <Dropdown.Menu>
                  {categories.map((category)=>{
                    return(
                      <Dropdown.Item >
                      <Link to={`/help/${category.id}`}>{category.name}</Link>
                      {category.id}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
                        

              <Nav.Link href="/Cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container >
        <Outlet />
      </Container>

      <footer  className="bg-body-tertiary py-3" g="dark" data-bs-theme="dark">
        <Container>This is the footer</Container>
      </footer>
     
      
    </div>
  );
};
export default Layout;
