import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./PropertyImages.css";

const PropertyImages = ({ images, className }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = images.map((item) => item.imagePath);

  // Preload images
  useEffect(() => {
    if (imageUrl.length > 0) {
      const img = new Image();
      img.src = imageUrl[currentImage];
      img.onload = () => setIsLoading(false);
    }
  }, [currentImage, imageUrl]);

  const nextImage = () => {
    setIsLoading(true);
    setCurrentImage((prev) => (prev + 1) % imageUrl.length);
  };

  const prevImage = () => {
    setIsLoading(true);
    setCurrentImage((prev) => (prev - 1 + imageUrl.length) % imageUrl.length);
  };
  return (
    <div className={`image-container ${className}`}>
      <div className="aspect-ratio">
        <img
          src={imageUrl[currentImage]}
          alt={`Property image ${currentImage + 1}`}
          className={isLoading ? "image-hidden" : "image-visible"}
        />
        {isLoading && <div className="aspect-ratio animate-pulse" />}
      </div>

      {/* Image navigation buttons */}
      <button
        onClick={prevImage}
        className="image-button image-button-left"
        aria-label="Previous image"
      >
        <ChevronLeft className="icon-size" />
      </button>

      <button
        onClick={nextImage}
        className="image-button image-button-right"
        aria-label="Next image"
      >
        <ChevronRight className="icon-size" />
      </button>

      {/* Image counter */}
      <div className="image-counter">
        {currentImage + 1} / {imageUrl.length}
      </div>

      {/* Thumbnail navigation */}
      <div className="thumbnail-container">
        {imageUrl.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsLoading(true);
              setCurrentImage(index);
            }}
            className={`thumbnail-button ${
              currentImage === index ? "thumbnail-active" : ""
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyImages;
