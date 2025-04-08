
import React from "react";
import { Button } from "@/components/ui/button";
import Settings from "@/components/Settings";
import { useVideoProcessing } from "@/contexts/VideoProcessingContext";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar: React.FC = () => {
  const { apiKey, validateApiKey } = useVideoProcessing();
  
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`flex items-center px-3 py-1 rounded-full ${!apiKey ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                    <span className={`h-2 w-2 rounded-full mr-2 ${!apiKey ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    <span className="text-xs font-medium">
                      {!apiKey ? 'API Key Required' : 'Gemini API Connected'}
                    </span>
                    <Info className="h-3 w-3 ml-1 opacity-70" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs max-w-xs">
                    {!apiKey 
                      ? "You need to add your Google AI Studio API key in settings to use the video transformation features."
                      : "API key is set and ready to use with Google's Gemini 2.0 Flash Image Generation model."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
