import { CheckCircle, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-lg bg-gradient-card shadow-industrial animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-primary animate-glow-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Order Submitted!
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Thank you for choosing Tattelo Bricks
            </p>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <div className="bg-muted/30 rounded-lg p-6 space-y-3">
              <Package className="w-8 h-8 text-primary mx-auto" />
              <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• You'll receive an email confirmation shortly</p>
                <p>• Our team will contact you within 24 hours</p>
                <p>• We'll schedule delivery at your convenience</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/")}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Need help? Contact our support team for assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYou;