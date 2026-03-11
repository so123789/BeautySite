import { useCart } from "../context/CartContext";
import "./Wishlist.scss";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useCart();

  return (
    <div className="wishlist-container">
      <h2 id="heading-wishlist">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item, idx) => (
            <div key={idx} className="wishlist-card">
              <img src={item.image_link} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.brand} - ${item.price}</p>
              <button
                className="btn btn-outline-danger btn-sm remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}