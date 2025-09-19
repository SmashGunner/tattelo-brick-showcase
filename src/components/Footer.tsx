import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <img src={logo} alt="Tattelo Bricks Logo" className="w-10 h-10" />
              <div>
                <h3 className="text-lg font-bold text-foreground">Tattelo Bricks</h3>
                <p className="text-sm text-muted-foreground">Paving & Building Bricks</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              Build a Better Tomorrow with Us
            </p>
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} Tattelo Bricks. All rights reserved.
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center lg:text-left">
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-foreground">076 500 0714</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-foreground">079 724 5067</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-foreground">tattelobussiness@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="text-center lg:text-left">
            <h4 className="text-lg font-semibold text-foreground mb-4">Location</h4>
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground text-sm">47 Chris Di Villiers Street, Ermelo, 2350</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;