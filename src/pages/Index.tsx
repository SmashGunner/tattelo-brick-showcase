import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import OrderModal from "@/components/OrderModal";
import Footer from "@/components/Footer";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";

const products = [
  {
    id: 1,
    title: "Premium Red Clay Bricks",
    shortDescription: "High-quality red clay bricks perfect for residential construction.",
    fullDescription: "Our premium red clay bricks are manufactured using traditional methods combined with modern quality control. These bricks offer excellent thermal insulation, durability, and aesthetic appeal. Perfect for residential and commercial construction projects. Each brick is carefully crafted to ensure consistent size, strength, and color. Suitable for load-bearing walls, decorative facades, and landscape applications.",
    image: product1,
    price: "$0.45",
    unit: "per brick",
  },
  {
    id: 2,
    title: "Industrial Concrete Blocks",
    shortDescription: "Heavy-duty concrete blocks designed for industrial applications.",
    fullDescription: "Our industrial concrete blocks are engineered for maximum strength and durability. Made with high-grade concrete and reinforced with steel fibers, these blocks can withstand extreme conditions and heavy loads. Ideal for commercial buildings, warehouses, retaining walls, and infrastructure projects. Features excellent fire resistance, weatherproofing, and sound insulation properties.",
    image: product2,
    price: "$2.85",
    unit: "per block",
  },
  {
    id: 3,
    title: "Fire-Resistant Refractory Bricks",
    shortDescription: "Specialized bricks for high-temperature applications and furnaces.",
    fullDescription: "Our fire-resistant refractory bricks are specially formulated to withstand temperatures up to 1800°C. Made from high-alumina clay and other refractory materials, these bricks are essential for furnaces, kilns, fireplaces, and industrial heating applications. They maintain structural integrity under extreme thermal stress and provide excellent thermal shock resistance.",
    image: product3,
    price: "$4.25",
    unit: "per brick",
  },
  {
    id: 4,
    title: "Decorative Facing Bricks",
    shortDescription: "Beautiful decorative bricks for architectural facades and design.",
    fullDescription: "Our decorative facing bricks combine functionality with aesthetic excellence. Available in various colors, textures, and finishes, these bricks are perfect for creating stunning architectural features. Each brick is meticulously crafted to provide consistent appearance while maintaining structural integrity. Ideal for facades, accent walls, garden features, and premium residential projects.",
    image: product4,
    price: "$1.95",
    unit: "per brick",
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOrderNow = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsOrderModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
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
                price={product.price}
                unit={product.unit}
                onOrderNow={() => handleOrderNow(product.title)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseModal}
        productTitle={selectedProduct || undefined}
      />
    </div>
  );
};

export default Index;
