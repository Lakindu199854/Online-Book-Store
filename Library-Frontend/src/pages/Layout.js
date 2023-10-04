import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { getAllCategories } from "./services/bookServices";
import "../pages/css/layout.css";

const Layout = () => {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const loadItems = async () => {
    const res = await getAllCategories();
    setShowDropdown(!showDropdown);
    console.log("res:" + res);
    await setCategories(res);
    res.map((category) => {
      console.log(category);
    });
    return true;
  };

  const deleteLocalStorage = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <div>
      <div className="layout-wrapper">
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/home">LIBRARY</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>

                <Dropdown show={showDropdown}>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    onClick={loadItems}
                  >
                    Categories
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {categories.map((category) => {
                      return (
                        <Dropdown.Item>
                          <Link to={`/booksByCategory/${category.id}`}>
                            {category.name}
                          </Link>
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
              <Nav>
                <Nav className="ml-auto">
                  {" "}
                  {/* Use ml-auto to align items to the right */}
                  <Nav.Link href="/Cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Nav.Link>
                  <Nav.Link href="/" onClick={deleteLocalStorage}>
                    Log Out
                  </Nav.Link>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Container className="flex-grow-1">
        <Outlet />
      </Container>

      {/* <footer className="bg-body-tertiary py-3" g="dark" data-bs-theme="dark">
        <Container>This is the footer</Container>
      </footer> */}
    </div>
  );
};
export default Layout;
