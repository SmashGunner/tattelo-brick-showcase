import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import OrderModal from "@/components/OrderModal";
import Footer from "@/components/Footer";
import stockBrick from "@/assets/stock-brick.jpg";
import interlockPaver from "@/assets/interlock-paver.jpg";
import maxiBrick from "@/assets/maxi-brick.jpg";
import hollowBrick from "@/assets/hollow-brick.jpg";
import truck1 from "@/assets/truck1.jpg";
import truck2 from "@/assets/truck2.jpg";
import mapImage from "@/assets/south-africa-map.jpg";

const products = [
  {
    id: 1,
    title: "Stock Bricks",
    shortDescription: "High-quality grey stock bricks perfect for general construction.",
    fullDescription: "Our stock bricks are manufactured using premium materials and traditional methods. These versatile grey bricks offer excellent durability and strength, making them ideal for all types of construction projects. Perfect for residential and commercial buildings, load-bearing walls, and structural applications. Each brick meets industry standards for consistency and quality.",
    image: stockBrick,
  },
  {
    id: 2,
    title: "Interlock Paver Brick",
    shortDescription: "Durable interlocking pavers for driveways and walkways.",
    fullDescription: "Our interlock paver bricks are designed for superior performance in high-traffic areas. These interlocking concrete pavers provide excellent drainage, easy installation, and long-lasting durability. Perfect for driveways, walkways, patios, and commercial applications. The unique interlocking design ensures stability and allows for easy replacement if needed.",
    image: interlockPaver,
  },
  {
    id: 3,
    title: "Maxi Bricks",
    shortDescription: "Large format paving bricks available in 60mm and 80mm sizes.",
    fullDescription: "Our maxi bricks, also known as paving bricks, are available in two convenient sizes: 60mm and 80mm thickness. These larger format bricks are perfect for paving applications, offering superior coverage and reduced installation time. Made with high-quality concrete, they provide excellent strength and weather resistance. Ideal for driveways, parking areas, and heavy-duty paving projects.",
    image: maxiBrick,
    sizes: ["60mm", "80mm"],
  },
  {
    id: 4,
    title: "Hollow Bricks",
    shortDescription: "Lightweight hollow bricks for efficient construction.",
    fullDescription: "Our hollow bricks are engineered to provide excellent thermal insulation while reducing overall weight. These innovative bricks feature hollow cores that improve insulation properties and reduce material costs. Perfect for partition walls, non-load bearing applications, and energy-efficient construction. The hollow design also allows for easy installation of utilities and reduces construction time.",
    image: hollowBrick,
  },
];

const deliveryImages = [
  {
    id: 1,
    image: truck1,
    caption: "Professional Delivery Service",
    slogan: "Building Dreams, One Brick at a Time"
  },
  {
    id: 2,
    image: truck2,
    caption: "Reliable Transportation",
    slogan: "Quality Bricks, Quality Service"
  },
  {
    id: 3,
    image: mapImage,
    caption: "Nationwide Coverage",
    slogan: "We Deliver Everywhere in South Africa"
  }
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleGetQuote = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsQuoteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroCarousel />

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Premium <span className="text-primary">Brick Collection</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our range of high-quality bricks designed for every construction need. 
              From residential projects to industrial applications, we have the perfect solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                shortDescription={product.shortDescription}
                fullDescription={product.fullDescription}
                image={product.image}
                sizes={product.sizes}
                onGetQuote={() => handleGetQuote(product.title)}
              />
            ))}
          </div>
        </section>

        {/* Delivery Section */}
        <section className="bg-gradient-card py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                We Deliver <span className="text-primary">Everywhere</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional delivery service across South Africa. Our fleet ensures your bricks arrive safely and on time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
              {deliveryImages.map((item) => (
                <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-glow transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.caption}</h3>
                    <p className="text-primary font-medium">{item.slogan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quote Modal */}
      <OrderModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseModal}
        productTitle={selectedProduct || undefined}
      />
    </div>
  );
};

export default Index;
