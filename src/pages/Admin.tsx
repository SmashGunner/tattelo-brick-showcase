import { useState, useEffect } from "react";
import { Search, Package, Calendar, User, Phone, MapPin, CreditCard, Plus, Edit, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Enquiry {
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
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    // Load enquiries from localStorage (in production, this would come from your database)
    const savedEnquiries = JSON.parse(localStorage.getItem("orders") || "[]");
    setEnquiries(savedEnquiries);
    setFilteredEnquiries(savedEnquiries);
  }, []);

  useEffect(() => {
    // Filter enquiries based on search term
    const filtered = enquiries.filter(
      (enquiry) =>
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.phone.includes(searchTerm) ||
        enquiry.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(enquiry.date).toLocaleDateString().includes(searchTerm)
    );
    setFilteredEnquiries(filtered);
  }, [searchTerm, enquiries]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage quotes, enquiries and items we have</p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search enquiries by name, email, phone, product, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
          </div>
          
          <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bell className="w-5 h-5 text-primary mr-1" />
                  <div className="text-2xl font-bold text-primary">{enquiries.length}</div>
                </div>
                <div className="text-sm text-muted-foreground">Quote Requests</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="text-center">
                <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Add Item We Have</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enquiries List */}
        <div className="space-y-4 animate-slide-up">
          {filteredEnquiries.length === 0 ? (
            <Card className="bg-gradient-card">
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Quote Requests Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No quote requests match your search criteria." : "No quote requests have been submitted yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <Card key={enquiry.id} className="bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Quote Request #{enquiry.id}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-primary border-primary">
                        {enquiry.status}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(enquiry.date).toLocaleDateString()}
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
                        <div className="text-foreground font-medium">{enquiry.name}</div>
                        <div className="text-muted-foreground">{enquiry.email}</div>
                        <div className="text-muted-foreground flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {enquiry.phone}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <Package className="w-4 h-4 mr-2 text-primary" />
                        Product Inquiry
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="text-foreground font-medium">{enquiry.product}</div>
                        <div className="text-muted-foreground">Status: {enquiry.quantity}</div>
                        <div className="text-muted-foreground flex items-center">
                          <CreditCard className="w-3 h-3 mr-1" />
                          {enquiry.paymentMethod}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        Delivery Address
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        {enquiry.address}
                      </div>
                      {enquiry.notes && (
                        <div className="text-sm">
                          <div className="text-foreground font-medium">Notes:</div>
                          <div className="text-muted-foreground">{enquiry.notes}</div>
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