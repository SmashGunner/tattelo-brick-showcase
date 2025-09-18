import { useState, useEffect } from "react";
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";
import hero4 from "@/assets/hero4.jpg";

const heroImages = [hero1, hero2, hero3, hero4];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Tattelo Bricks Hero ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-center text-white z-10 px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-2 animate-fade-in">
                Welcome to <span className="text-primary-glow">Tattelo Bricks</span>
              </h1>
              <h2 className="text-lg md:text-xl mb-4 animate-fade-in text-primary-glow font-semibold">
                Paving & Building Bricks
              </h2>
              <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
                Build a Better Tomorrow with Us
              </p>
              <div className="space-y-2 text-sm md:text-lg animate-slide-up">
                <p>✓ Paving & Building Bricks</p>
                <p>✓ Affordable & Transparent Pricing</p>
                <p>✓ Quality Results That Exceed Your Expectations</p>
              </div>
            </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary shadow-glow scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;