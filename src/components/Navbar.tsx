import { Eye, User, Home, Stethoscope, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { NavLink } from "./NavLink";

const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { to: "/home", icon: Home, label: "Dashboard" },
    { to: "/professional", icon: Stethoscope, label: "Professional" },
    { to: "/generic", icon: Eye, label: "Generic" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };
  
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Vision AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-all duration-200"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-accent/10"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
