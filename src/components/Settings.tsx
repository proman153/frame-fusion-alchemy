
import React, { useState } from "react";
import { Settings as SettingsIcon, Save, Eye, EyeOff, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useVideoProcessing } from "@/contexts/VideoProcessingContext";
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { apiKey, setApiKey, validateApiKey } = useVideoProcessing();
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const saveSettings = async () => {
    if (!tempApiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Google AI Studio API key to enable video transformations",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    try {
      const isValid = await validateApiKey(tempApiKey);
      
      if (isValid) {
        setApiKey(tempApiKey);
        toast({
          title: "Settings saved",
          description: "Your API key has been saved and validated"
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "The provided API key could not be validated with Google AI Studio",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Could not validate the API key. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-fusion-dark border-white/10 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Settings</SheetTitle>
          <SheetDescription className="text-gray-400">
            Configure your VideoFusion API settings
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">API Configuration</h3>
            <div className="flex items-start space-x-2 text-sm text-gray-400 mb-3">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Enter your Google AI Studio API key to enable video transformations. Without a valid API key, you won't be able to transform videos.
              </p>
            </div>
            
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                className="pr-10 bg-black/50 border-white/10 text-white"
                placeholder="Enter your API key"
              />
              <button 
                type="button" 
                onClick={toggleShowApiKey} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            <p className="text-xs text-fusion-primary mt-2">
              You need a Google AI Studio API key with access to the Gemini 2.0 Flash (Image Generation) model.
            </p>
            
            <Button 
              onClick={saveSettings} 
              className="mt-4 bg-fusion-primary hover:bg-fusion-primary/90 w-full"
              disabled={isValidating}
            >
              {isValidating ? (
                <>
                  <span className="animate-spin mr-2">⭘</span>
                  Validating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500">
              Your API key is stored locally in your browser and is used to authenticate requests to the Google AI Studio service.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
