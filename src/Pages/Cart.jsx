import { useCart } from "../context/CartContext";
import { Row, Col } from "react-bootstrap";
import "./Cart.scss";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <Row>
          <Col md={9} className="cart-items">
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-item">
                <img src={item.image_link} alt={item.name} />
                <div className="cart-item-info">
                  <h5>{item.name}</h5>
                  <p>${item.price}</p>
                </div>
                <button
                  className="btn btn-danger btn-sm remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </Col>
          <Col md={3} className="cart-summary">
            <div className="summary-box">
              <h4>Total</h4>
              <p className="total-price">${total.toFixed(2)}</p>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}