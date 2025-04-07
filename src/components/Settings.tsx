
import React, { useState } from "react";
import { Settings as SettingsIcon, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useVideoProcessing } from "@/contexts/VideoProcessingContext";
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { apiKey, setApiKey } = useVideoProcessing();
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  const saveSettings = () => {
    setApiKey(tempApiKey);
    toast({
      title: "Settings saved",
      description: "Your API key has been saved"
    });
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
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">API Configuration</h3>
            <p className="text-sm text-gray-400">
              Enter your API key for video transformation services
            </p>
            
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
            
            <Button onClick={saveSettings} className="mt-2 bg-fusion-primary hover:bg-fusion-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500">
              Your API key is stored locally in your browser and is not sent to our servers.
              We only use it to authenticate your requests to the transformation service.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
