import { useState, useEffect } from "react";
import { Package, Edit, Trash2, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import stockBrick from "@/assets/stock-brick.jpg";
import interlockPaver from "@/assets/interlock-paver.jpg";
import maxiBrick from "@/assets/maxi-brick.jpg";
import hollowBrick from "@/assets/hollow-brick.jpg";

interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  sizes?: string[];
}

const ItemsAccordion = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Stock Bricks",
      description: "High-quality standard building bricks for all construction needs",
      image: stockBrick,
    },
    {
      id: 2,
      name: "Interlock Paver Bricks",
      description: "Durable interlocking paving bricks perfect for driveways and walkways",
      image: interlockPaver,
    },
    {
      id: 3,
      name: "Maxi Bricks",
      description: "Large format building bricks available in multiple sizes",
      image: maxiBrick,
      sizes: ["60mm", "80mm"]
    },
    {
      id: 4,
      name: "Hollow Bricks",
      description: "Lightweight hollow bricks ideal for efficient construction",
      image: hollowBrick,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const addItem = () => {
    const newItem: Item = {
      id: Date.now(),
      name: "New Item",
      description: "Click edit to modify this item",
      image: stockBrick,
    };
    setItems([...items, newItem]);
  };

  const editItem = (id: number) => {
    // In a real app, this would open a modal to edit the item
    console.log("Edit item", id);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="items">
        <AccordionTrigger className="text-lg font-semibold">
          Items We Have ({items.length})
        </AccordionTrigger>
        <AccordionContent>
          {/* Search and Actions */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search items by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
            <Button onClick={addItem} className="whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${item.image})` }}>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => editItem(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteItem(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold mb-2">{item.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                  {item.sizes && (
                    <div className="flex flex-wrap gap-1">
                      {item.sizes.map((size) => (
                        <span
                          key={size}
                          className="bg-primary/10 text-primary px-2 py-1 text-xs rounded-full"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="bg-gradient-card">
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Items Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No items match your search criteria." : "No items available."}
                </p>
              </CardContent>
            </Card>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ItemsAccordion;