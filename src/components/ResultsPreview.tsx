
import React from "react";
import { Download, RefreshCcw, Share2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// These would be dynamic in a real application
const mockResults = [
  { id: 1, src: "https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Original+Frame+1", type: "original" },
  { id: 2, src: "https://via.placeholder.com/300x200/6C63FF/ffffff?text=Transformed+1", type: "transformed" },
  { id: 3, src: "https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Original+Frame+2", type: "original" },
  { id: 4, src: "https://via.placeholder.com/300x200/6C63FF/ffffff?text=Transformed+2", type: "transformed" },
  { id: 5, src: "https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Original+Frame+3", type: "original" },
  { id: 6, src: "https://via.placeholder.com/300x200/6C63FF/ffffff?text=Transformed+3", type: "transformed" },
];

const ResultsPreview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-purple">
            Results Preview
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See the before and after transformation of your video frames.
          </p>
        </div>
        
        <div className="mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
          <Card className="border border-white/10 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-display font-bold text-white">Frame Transformations</h3>
                <p className="text-sm text-gray-400">6 frames processed • Anime style</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button className="bg-fusion-primary hover:bg-fusion-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mockResults.map((result) => (
                <div key={result.id} className="group relative">
                  <div className="relative overflow-hidden rounded-lg border border-white/10">
                    <img 
                      src={result.src} 
                      alt={`Frame ${result.id}`} 
                      className="w-full h-auto object-cover aspect-video"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-xs font-medium text-white">
                        {result.type === "original" ? "Original" : "Transformed"}
                      </span>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                          <Maximize2 className="h-3.5 w-3.5 text-white" />
                        </button>
                        <button className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                          <Download className="h-3.5 w-3.5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                Load More Frames
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.7s' }}>
          <Card className="border border-white/10 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-center space-y-6">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fusion-secondary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-fusion-secondary" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">Ready to Create Video</h3>
                <p className="text-gray-400 max-w-lg mx-auto">
                  All your frames have been transformed! Would you like to compile them back into a video?
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-fusion-primary hover:bg-fusion-primary/90">
                  <RefreshCcw className="mr-2 h-5 w-5" />
                  Create Video
                </Button>
                <Button variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Results
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultsPreview;
