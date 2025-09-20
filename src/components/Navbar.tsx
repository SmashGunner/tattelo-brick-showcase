import { useState } from "react";
import { Menu, X, Home, User, Settings as SettingsIcon } from "lucide-react";
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
            <div className="flex items-center space-x-4">
              <img 
                src={logo} 
                alt="TatteloBricks Logo" 
                className="w-14 h-14"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">TatteloBricks</h1>
                <p className="text-sm text-accent font-medium">Paving and Building Bricks</p>
                <p className="text-xs text-muted-foreground italic">Build a Better Tomorrow with Us</p>
              </div>
            </div>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground bg-primary shadow-glow font-semibold"
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`
              }
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground bg-primary shadow-glow font-semibold"
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`
              }
            >
              <User className="w-4 h-4" />
              <span>Admin</span>
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-accent-foreground bg-accent shadow-glow font-semibold"
                    : "text-foreground hover:text-accent hover:bg-accent/10"
                }`
              }
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
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
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground bg-primary font-semibold"
                    : "text-foreground hover:text-primary hover:bg-primary/10"
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
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground bg-primary font-semibold"
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Admin</span>
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-accent-foreground bg-accent font-semibold"
                    : "text-foreground hover:text-accent hover:bg-accent/10"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </NavLink>
            
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;