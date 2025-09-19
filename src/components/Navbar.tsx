import { useState } from "react";
import { Menu, X, Home, User, Phone, Mail, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Desktop Logo and Branding */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Tattelo Bricks Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Tattelo Bricks</h1>
                <p className="text-sm text-muted-foreground">Paving & Building Bricks</p>
              </div>
            </div>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
            
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;