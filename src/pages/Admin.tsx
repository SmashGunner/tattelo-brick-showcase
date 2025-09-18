import { useState, useEffect } from "react";
import { Search, Package, Calendar, User, Phone, MapPin, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  product: string;
  quantity: string;
  paymentMethod: string;
  notes: string;
  date: string;
  status: string;
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage (in production, this would come from your database)
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
    setFilteredOrders(savedOrders);
  }, []);

  useEffect(() => {
    // Filter orders based on search term
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(order.date).toLocaleDateString().includes(searchTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders and view customer information</p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders by name, email, phone, product, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
          </div>
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{orders.length}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4 animate-slide-up">
          {filteredOrders.length === 0 ? (
            <Card className="bg-gradient-card">
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No orders match your search criteria." : "No orders have been placed yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Order #{order.id}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-primary border-primary">
                        {order.status}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <User className="w-4 h-4 mr-2 text-primary" />
                        Customer
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="text-foreground font-medium">{order.name}</div>
                        <div className="text-muted-foreground">{order.email}</div>
                        <div className="text-muted-foreground flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {order.phone}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <Package className="w-4 h-4 mr-2 text-primary" />
                        Product
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="text-foreground font-medium">{order.product}</div>
                        <div className="text-muted-foreground">Quantity: {order.quantity} units</div>
                        <div className="text-muted-foreground flex items-center">
                          <CreditCard className="w-3 h-3 mr-1" />
                          {order.paymentMethod.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        Delivery
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        {order.address}
                      </div>
                      {order.notes && (
                        <div className="text-sm">
                          <div className="text-foreground font-medium">Notes:</div>
                          <div className="text-muted-foreground">{order.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;