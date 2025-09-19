import { useState, useEffect } from "react";
import { Calendar, User, Phone, MapPin, Package, Edit2, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  contacted?: boolean;
}

const QuotesAccordion = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const savedEnquiries = JSON.parse(localStorage.getItem("orders") || "[]");
    setEnquiries(savedEnquiries);
    setFilteredEnquiries(savedEnquiries);
  }, []);

  useEffect(() => {
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

  const updateStatus = (id: number, newStatus: string) => {
    const updatedEnquiries = enquiries.map(enquiry =>
      enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
    );
    setEnquiries(updatedEnquiries);
    localStorage.setItem("orders", JSON.stringify(updatedEnquiries));
  };

  const markAsContacted = (id: number) => {
    const updatedEnquiries = enquiries.map(enquiry =>
      enquiry.id === id ? { ...enquiry, contacted: true } : enquiry
    );
    setEnquiries(updatedEnquiries);
    localStorage.setItem("orders", JSON.stringify(updatedEnquiries));
  };

  const clearCompletedQuotes = () => {
    const activeEnquiries = enquiries.filter(enquiry => enquiry.status !== "Completed");
    setEnquiries(activeEnquiries);
    localStorage.setItem("orders", JSON.stringify(activeEnquiries));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="quotes" className="w-full">
      <AccordionItem value="quotes">
        <AccordionTrigger className="text-lg font-semibold">
          Quote Requests ({enquiries.length})
        </AccordionTrigger>
        <AccordionContent>
          {/* Search and Actions */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search quotes by name, email, phone, product, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input"
              />
            </div>
            <Button 
              onClick={clearCompletedQuotes}
              variant="outline"
              className="whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Completed
            </Button>
          </div>

          {/* Quotes List */}
          <div className="space-y-4">
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
                        {enquiry.contacted && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Contacted
                          </Badge>
                        )}
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(enquiry.status)}
                          <Select
                            value={enquiry.status}
                            onValueChange={(value) => updateStatus(enquiry.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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
                          Customer Details
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="text-foreground font-medium">{enquiry.name}</div>
                          <div className="text-muted-foreground">{enquiry.email}</div>
                          <div className="text-muted-foreground flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {enquiry.phone}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsContacted(enquiry.id)}
                          disabled={enquiry.contacted}
                          className="w-full"
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          {enquiry.contacted ? "Contacted" : "Mark as Contacted"}
                        </Button>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center">
                          <Package className="w-4 h-4 mr-2 text-primary" />
                          Product Inquiry
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="text-foreground font-medium">{enquiry.product}</div>
                          <div className="text-muted-foreground">Quantity: {enquiry.quantity}</div>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default QuotesAccordion;