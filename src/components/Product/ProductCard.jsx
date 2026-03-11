import { Link } from "react-router-dom";
import './ProductCard.scss';
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, cartItems, wishlist } = useCart();
  const navigate = useNavigate();

  const handleCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const isInCart = cartItems.some(p => p.id === product.id);
  const isInWishlist = wishlist.some(p => p.id === product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
    navigate('/wishlist');
  };

  return (
    <Link to={`/product/${product.id}`} className="card">
      <img src={product.image_link} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.brand}</p>
      <p>${product.price}</p>
      <div className="card-actions">
        <button className="btn btn-light" onClick={handleWishlist} title={isInWishlist ? "In wishlist" : "Add to wishlist"} disabled={isInWishlist}>
          <i className="fas fa-heart"></i>
        </button>
        <button className="btn btn-light" onClick={handleCart} title={isInCart ? "In cart" : "Add to cart"} disabled={isInCart}>
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </Link>
  );
}