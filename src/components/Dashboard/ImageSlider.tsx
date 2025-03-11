import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Card, Row } from "antd";

const images = [
    "https://scontent.fbkk8-3.fna.fbcdn.net/v/t39.30808-6/441958771_981758070619547_4817258206031506006_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=53Bcv0DmvjwQ7kNvgFIEGKM&_nc_oc=AdjZ9AdMR6800v3aCywr9Z-iJ0hI6q0BbgJ8LUlyieBai45w6-vSTq8bYpxxId1vJptqDjrwz7cJv0FSuPLyEtH1&_nc_zt=23&_nc_ht=scontent.fbkk8-3.fna&_nc_gid=A8hdI5BfBZBNc99vbCvYVIn&oh=00_AYH1z-QRsO_jw0NAAwmZpR-pLRyRWwa8aepfShmhYa73eA&oe=67D638B0",
    "https://scontent.fbkk8-3.fna.fbcdn.net/v/t39.30808-6/441958771_981758070619547_4817258206031506006_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=53Bcv0DmvjwQ7kNvgFIEGKM&_nc_oc=AdjZ9AdMR6800v3aCywr9Z-iJ0hI6q0BbgJ8LUlyieBai45w6-vSTq8bYpxxId1vJptqDjrwz7cJv0FSuPLyEtH1&_nc_zt=23&_nc_ht=scontent.fbkk8-3.fna&_nc_gid=A8hdI5BfBZBNc99vbCvYVIn&oh=00_AYH1z-QRsO_jw0NAAwmZpR-pLRyRWwa8aepfShmhYa73eA&oe=67D638B0"
    
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000
};

const ImageSlider = () => {
  return (
    <div className="p-4 w-full h-full">
    <Slider {...settings}>
      {images.map((src, index) => (
        <div key={index} className="flex justify-center">
          <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
        </div>
      ))}
    </Slider>
  </div>
  
  );
};

export default ImageSlider;
