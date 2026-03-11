import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-section">
              <h4 className="footer-title">Customer Policies</h4>
              <ul className="footer-links">
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                <li><Link to="/return-policy">Return & Refund Policy</Link></li>
              </ul>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <div className="footer-section">
              <h4 className="footer-title">Useful Links</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/size-guide">Size Guide</Link></li>
                <li><Link to="/blog">Beauty Blog</Link></li>
              </ul>
            </div>
          </Col>

          <Col lg={4} md={12} className="mb-4">
            <div className="footer-section">
              <h4 className="footer-title">Contact Us</h4>
              <div className="contact-info">
                <p>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:support@lumenbeauty.com">support@lumenbeauty.com</a>
                </p>
                <p>
                  <i className="fas fa-phone"></i>
                  <a href="tel:+1234567890">+1 (234) 567-8900</a>
                </p>
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                  123 Beauty Street, Glamour City, GC 12345
                </p>
              </div>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-pinterest"></i></a>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>&copy; 2024 Lumen Beauty. All rights reserved.</p>
          <p>Made with <span className="heart">♥</span> for beauty lovers</p>
        </div>
      </Container>
    </footer>
  );
}