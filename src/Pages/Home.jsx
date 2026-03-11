import Banner from "../components/Banner/Banner";
import Slide1 from "../assets/Slide1.png";
import Slide2 from "../assets/slide2.png";
import Slide3 from "../assets/slide3.png";
import Brands from "../components/Brands/Brands";

export default function Home() {
  return (
    <>
      <Banner
        slides={[
          {
            image: Slide1,
            title: "Glow Naturally",
            subtitle: "Discover our new skincare range",
            interval: 3000
          },
          {
            image: Slide2,
            title: "Luxury Makeup",
            subtitle: "Feel beautiful every day",
            interval: 4000
          },
          {
            image: Slide3,
            title: "Beauty Sale",
            subtitle: "Up to 40% off this week",
            interval: 3500
          }
        ]}
      />
      <Brands />
    </>
  );
}