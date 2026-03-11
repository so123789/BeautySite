import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Brands.scss";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    // navigate to products page with brand filter in state
    navigate('/products', { state: { brand } });
  };

  useEffect(() => {
    const cachedBrands = localStorage.getItem('brands');
    if (cachedBrands) {
      setBrands(JSON.parse(cachedBrands));
      setLoading(false);
    } else {
      axios
        .get("https://makeup-api.herokuapp.com/api/v1/products.json")
        .then(res => {
          const uniqueBrands = [
            ...new Set(
              res.data
                .map(item => item.brand)
                .filter(Boolean)
            )
          ];
          
          setBrands(uniqueBrands);
          localStorage.setItem('brands', JSON.stringify(uniqueBrands));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <section className="brands-section" id="brands">
        <h2 className="brands-title">Discover the Brands</h2>
        <div className="loading">Loading brands...</div>
      </section>
    );
  }

  return (
    <section className="brands-section" id="brands">
      <h2 className="brands-title">Discover the Brands</h2>

      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div className="brand-card" key={index} onClick={() => handleBrandClick(brand)}>
            <div className="brand-circle">
              {brand.charAt(0).toUpperCase()}
            </div>
            <p className="brand-name">{brand}</p>
          </div>
        ))}
      </div>
    </section>
  );
}