import { useState, useEffect } from "react";
import { Accordion, Form } from "react-bootstrap";
import "./Sidebar.scss";

export default function Sidebar({ onFilterChange, products = [], initialFilters = {} }) {
  const [price, setPrice] = useState(initialFilters.price || 50);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(initialFilters.brand || []);
  const [selectedTypes, setSelectedTypes] = useState(initialFilters.type || []);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    if (products.length > 0) {
      // Get unique brands
      const uniqueBrands = [
        ...new Set(
          products
            .map(item => item.brand)
            .filter(Boolean)
        )
      ];
      setBrands(uniqueBrands);

      // Get unique types
      const uniqueTypes = [
        ...new Set(
          products
            .map(item => item.product_type)
            .filter(Boolean)
        )
      ];
      setTypes(uniqueTypes);

      // Get min and max prices
      const prices = products
        .map(item => parseFloat(item.price))
        .filter(price => !isNaN(price));
      
      if (prices.length > 0) {
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setMinPrice(min);
        setMaxPrice(max);
        setPrice(max); // Set initial price to max
      }
    }
  }, [products]);

  const handlePrice = (e) => {
    setPrice(e.target.value);
    onFilterChange({ price: e.target.value });
  };

  const handleBrandChange = (brand, checked) => {
    let newSelectedBrands;
    if (checked) {
      newSelectedBrands = [...selectedBrands, brand];
    } else {
      newSelectedBrands = selectedBrands.filter(b => b !== brand);
    }
    setSelectedBrands(newSelectedBrands);
    onFilterChange({ brand: newSelectedBrands });
  };

  const handleTypeChange = (type, checked) => {
    let newSelectedTypes;
    if (checked) {
      newSelectedTypes = [...selectedTypes, type];
    } else {
      newSelectedTypes = selectedTypes.filter(t => t !== type);
    }
    setSelectedTypes(newSelectedTypes);
    onFilterChange({ type: newSelectedTypes });
  };

  // if initial filters were provided, propagate them on mount
  useEffect(() => {
    if (initialFilters) {
      onFilterChange(initialFilters);
    }
  }, []);
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Filters</h4>

      <Accordion defaultActiveKey="0" alwaysOpen>

        {/* Brand */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Brand</Accordion.Header>
          <Accordion.Body>
            {brands.map(brand => (
              <Form.Check
                key={brand}
                label={brand}
                checked={selectedBrands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Category */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body>
            {types.map(type => (
              <Form.Check
                key={type}
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                checked={selectedTypes.includes(type)}
                onChange={(e) => handleTypeChange(type, e.target.checked)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Price Slider */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <Form.Range 
              min={minPrice} 
              max={maxPrice} 
              value={price} 
              onChange={handlePrice} 
            />
            <p className="price-label">Up to ${price}</p>
          </Accordion.Body>
        </Accordion.Item>

        {/* Color */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Color</Accordion.Header>
          <Accordion.Body className="color-options">
            <span className="color red"></span>
            <span className="color pink"></span>
            <span className="color nude"></span>
            <span className="color brown"></span>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}