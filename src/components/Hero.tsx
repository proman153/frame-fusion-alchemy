
import React from "react";
import { ArrowDownCircle, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient -z-10"></div>
      
      <div className="max-w-5xl mx-auto text-center mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-gradient-primary tracking-tight">
          Frame Fusion Alchemy
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Transform your videos into stunning AI-enhanced imagery.
          Upload, prompt, and watch the magic unfold frame by frame.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-fusion-primary to-fusion-accent hover:opacity-90 transition-all text-white px-8 py-6"
          >
            Start Creating <MoveRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/20 text-white hover:bg-white/5 px-8 py-6"
          >
            View Examples
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 w-full flex justify-center animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
        <Button variant="ghost" size="icon" className="animate-float" onClick={() => {
          document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <ArrowDownCircle className="h-10 w-10 text-white/70 hover:text-white transition-colors" />
        </Button>
      </div>
      
      {/* Abstract shapes */}
      <div className="absolute top-1/4 -left-10 w-40 h-40 bg-fusion-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 -right-10 w-60 h-60 bg-fusion-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-2/3 left-1/4 w-20 h-20 bg-fusion-secondary/20 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '0.7s' }}></div>
    </section>
  );
};

export default Hero;
