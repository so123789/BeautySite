import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss';

export default function NavbarComponent() {
  const { cartItems, wishlist } = useCart();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Lumen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
           
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/wishlist" className="nav-icon">
              <i className="fas fa-heart"></i>
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-icon">
              <i className="fas fa-shopping-cart"></i>
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}