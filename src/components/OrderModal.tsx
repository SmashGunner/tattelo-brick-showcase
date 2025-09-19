import { useState } from "react";
import { X, Package, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

const OrderModal = ({ isOpen, onClose, productTitle = "Custom Order" }: OrderModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the order to your backend
    console.log("Order submitted:", { ...formData, product: productTitle });
    
    // Store order data for admin view (in a real app, this would be in a database)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      ...formData,
      product: productTitle,
      date: new Date().toISOString(),
      status: "pending",
    };
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    
    onClose();
    navigate("/thank-you");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card shadow-industrial animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Get Quote for {productTitle}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <User className="w-4 h-4 mr-2 text-primary" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-input"
                  />
                </div>
                <div>
                  <Label htmlFor="surname">Surname *</Label>
                  <Input
                    id="surname"
                    required
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    className="bg-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-input"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Cell Phone Number *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-input"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Delivery Information
              </h3>
              
              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-input"
                  placeholder="Please provide your complete delivery address..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-primary hover:shadow-glow">
                Submit Quote Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderModal;