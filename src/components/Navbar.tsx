
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <span className="bg-fusion-primary rounded-lg p-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3L18 21M12 3V21M18 3L6 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="font-display font-bold text-xl text-white">FrameFusion</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Examples
            </a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Support
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex border-white/10 text-white hover:bg-white/5">
              Sign In
            </Button>
            <Button className="hidden md:flex bg-fusion-primary hover:bg-fusion-primary/90">
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-morphism">
          <div className="space-y-2 py-6 px-4">
            <a href="#" className="block py-3 text-base font-medium text-white">
              Features
            </a>
            <a href="#" className="block py-3 text-base font-medium text-white">
              Examples
            </a>
            <a href="#" className="block py-3 text-base font-medium text-white">
              Pricing
            </a>
            <a href="#" className="block py-3 text-base font-medium text-white">
              Support
            </a>
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full border-white/10 text-white">
                Sign In
              </Button>
              <Button className="w-full bg-fusion-primary hover:bg-fusion-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
