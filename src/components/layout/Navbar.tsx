import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar as HeroNavbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Departments", path: "/departments" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-black backdrop-blur-sm border-b border-divider"
      maxWidth="xl"
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-foreground"
        />
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-md">
              <span className="font-bold text-white">CEC</span>
            </div>
            <p className="font-semibold text-foreground hidden sm:block">
              Department Events Portal
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.path} isActive={isActive(item.path)}>
            <Link
              to={item.path}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-foreground-600 hover:text-foreground"
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link to="/login">
            <Button variant="light" color="default" className="text-foreground">
              Login
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/signup">
            <Button color="primary" variant="solid" className="font-medium">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-md pt-6">
        {navItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              to={item.path}
              className={`w-full text-lg py-2 ${
                isActive(item.path)
                  ? "text-primary font-medium"
                  : "text-foreground-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-6">
          <Link
            to="/login"
            className="w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button
              variant="light"
              color="default"
              className="w-full text-foreground"
            >
              Login
            </Button>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
};

export default Navbar;
