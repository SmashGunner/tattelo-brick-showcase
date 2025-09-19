import { useState, useEffect } from "react";
import { Search, Bell, Settings, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuotesAccordion from "@/components/QuotesAccordion";
import ItemsAccordion from "@/components/ItemsAccordion";

const Admin = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [newQuotesCount, setNewQuotesCount] = useState(0);

  useEffect(() => {
    const savedEnquiries = JSON.parse(localStorage.getItem("orders") || "[]");
    setEnquiries(savedEnquiries);
    
    // Count new quotes (assuming quotes from today are "new")
    const today = new Date().toDateString();
    const newQuotes = savedEnquiries.filter((enquiry: any) => 
      new Date(enquiry.date).toDateString() === today
    );
    setNewQuotesCount(newQuotes.length);
  }, []);

  const scrollToQuotes = () => {
    document.querySelector('[data-section="quotes"]')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToItems = () => {
    document.querySelector('[data-section="items"]')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage quotes, enquiries and items we have</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="bg-gradient-card hover:shadow-glow transition-all duration-300 cursor-pointer"
            onClick={scrollToQuotes}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bell className="w-5 h-5 text-primary mr-1" />
                  <div className="text-2xl font-bold text-primary">{enquiries.length}</div>
                  {newQuotesCount > 0 && (
                    <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {newQuotesCount}
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Quote Requests</div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-gradient-card hover:shadow-glow transition-all duration-300 cursor-pointer"
            onClick={scrollToItems}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Items We Have</div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-card hover:shadow-glow transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/admin/settings')}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Website Settings</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="text-2xl font-bold text-primary">4</div>
                </div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes Section */}
        <div data-section="quotes" className="mb-8">
          <QuotesAccordion />
        </div>

        {/* Items Section */}
        <div data-section="items" className="mb-8">
          <ItemsAccordion />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;