
import React, { useState } from "react";
import { Wand2, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const examplePrompts = [
  "Convert each frame into a cinematic anime style with vibrant colors",
  "Transform the video into a noir-style black and white film with dramatic shadows",
  "Apply a watercolor painting effect with soft edges and pastel colors",
  "Turn each frame into an oil painting in the style of Vincent van Gogh"
];

const PromptSection: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  
  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-purple">
            Craft Your Transformation
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Describe how you want to transform each frame of your video. Be creative and specific!
          </p>
        </div>
        
        <Card className="border border-white/10 bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-xl animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
          <div className="space-y-6">
            <Textarea
              placeholder="Describe your desired transformation... (e.g., 'Convert each frame into a cinematic anime style with vibrant colors')"
              className="min-h-[120px] bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-fusion-primary focus:ring-fusion-primary/50"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-fusion-secondary" />
                <h3 className="text-sm font-medium text-white">Example prompts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examplePrompts.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 border-white/10 bg-white/5 hover:bg-white/10 text-left"
                    onClick={() => handleExampleClick(example)}
                  >
                    <span className="truncate">{example}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <Button
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-fusion-primary to-fusion-accent hover:opacity-90 text-white"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Apply Transformation
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PromptSection;
