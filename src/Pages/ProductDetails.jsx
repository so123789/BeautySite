import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Pagination } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import ProductCard from "../components/Product/ProductCard";
import "./ProductDetails.scss";

export default function ProductDetails() {
  const location = useLocation();
  let initialFilters = location.state || {};
  // normalize brand/type to arrays
  if (initialFilters.brand && !Array.isArray(initialFilters.brand)) {
    initialFilters = { ...initialFilters, brand: [initialFilters.brand] };
  }
  if (initialFilters.type && !Array.isArray(initialFilters.type)) {
    initialFilters = { ...initialFilters, type: [initialFilters.type] };
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const cachedProducts = localStorage.getItem('products');
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
      setLoading(false);
    } else {
      axios
        .get("https://makeup-api.herokuapp.com/api/v1/products.json")
        .then(res => {
          setProducts(res.data);
          localStorage.setItem('products', JSON.stringify(res.data));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilters(prev => ({ ...prev, ...newFilter }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredProducts = products.filter(product => {
    if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.type && filters.type.length > 0 && !filters.type.includes(product.product_type)) return false;
    if (filters.price && product.price > parseFloat(filters.price)) return false;
    if (filters.color && product.product_colors && !product.product_colors.some(color => color.colour_name === filters.color)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  // reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (loading) {
    return (
      <Row>
        <Col md={3}>
          <Sidebar onFilterChange={handleFilterChange} products={products} />
        </Col>
        <Col md={9}>
          <div className="loading">Loading products...</div>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col md={3}>
        <Sidebar onFilterChange={handleFilterChange} products={products} />
      </Col>
      <Col md={9}>
        <div className="grid">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination-container">
            <Pagination>
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Pagination.Prev>
              <Pagination.Item disabled>
                Page {currentPage} of {totalPages}
              </Pagination.Item>
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </Pagination.Next>
            </Pagination>
          </div>
        )}
      </Col>
    </Row>
  );
}