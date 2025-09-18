const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-foreground">Tattelo Bricks</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Tattelo Bricks. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Premium quality bricks for all your construction needs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;