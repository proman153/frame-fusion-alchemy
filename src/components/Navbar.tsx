
import React from "react";
import { Button } from "@/components/ui/button";
import Settings from "@/components/Settings";

const Navbar: React.FC = () => {
  return (
    <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-fusion-primary to-fusion-accent bg-clip-text text-transparent">
              VideoFusion
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Settings />
            <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5">
              Sign In
            </Button>
            <Button size="sm" className="bg-fusion-primary hover:bg-fusion-primary/90">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
