import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  sizes?: string[];
  onGetQuote: () => void;
}

const ProductCard = ({ title, shortDescription, fullDescription, image, sizes, onGetQuote }: ProductCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-[1.02] group">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        {sizes && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-muted-foreground">Available sizes:</span>
            {sizes.map((size, index) => (
              <span key={index} className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                {size}
              </span>
            ))}
          </div>
        )}
        <CardDescription className="text-muted-foreground">
          {expanded ? fullDescription : shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-accent hover:text-accent-foreground w-full justify-center"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              View More
            </>
          )}
        </Button>

        <Button
          onClick={onGetQuote}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Get Quote
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;