import Carousel from "react-bootstrap/Carousel";
import "./Banner.scss";



export default function Banner({ slides }) {
  return (
    <Carousel fade className="banner">
      {slides.map((slide, index) => (
        <Carousel.Item key={index} interval={slide.interval || 3000}>
          
          {/* Image */}
          <img
            className="d-block w-100 banner-img"
            src={slide.image}
            alt={slide.title}
          />

          {/* Caption */}
          {(slide.title || slide.subtitle) && (
            <Carousel.Caption className="banner-caption">
              {slide.title && <h3>{slide.title}</h3>}
              {slide.subtitle && <p>{slide.subtitle}</p>}
            </Carousel.Caption>
          )}

        </Carousel.Item>
      ))}
    </Carousel>
  );
}