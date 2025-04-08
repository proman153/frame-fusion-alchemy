
import React from "react";
import { Download, RefreshCcw, Share2, Maximize2, Sparkles, Play, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useVideoProcessing } from "@/contexts/VideoProcessingContext";

const ResultsPreview: React.FC = () => {
  const { 
    frames, 
    status, 
    prompt, 
    startProcessing, 
    resetProcess, 
    viewMode, 
    setViewMode,
    transformedVideo 
  } = useVideoProcessing();
  
  const isComplete = status === "complete";
  const isProcessing = status === "processing" || status === "transforming" || status === "uploading";
  
  // If there are no frames and processing is not complete, don't show this section
  if (frames.length === 0 && !isProcessing) {
    return null;
  }

  // Show a loading state if processing
  if (isProcessing) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-purple">
              {status === "processing" ? "Processing Your Video" : 
               status === "transforming" ? "Transforming Your Frames" : 
               "Uploading Your Video"}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {status === "processing" ? "Please wait while we process your video frames..." : 
               status === "transforming" ? "Please wait while we transform your video frames with Gemini 2.0..." : 
               "Please wait while we upload your video..."}
            </p>
          </div>
          
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <Card className="border border-white/10 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-center space-y-6 py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fusion-primary/10 mb-4">
                  <RefreshCcw className="h-8 w-8 text-fusion-primary animate-spin" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {status === "transforming" ? "Transforming Your Frames with Google Gemini" : "Processing Your Video"}
                </h3>
                <p className="text-gray-400 max-w-lg mx-auto">
                  {status === "transforming" 
                    ? `Our AI is hard at work applying the style "${prompt}" to each frame of your video using Google's Gemini 2.0 Flash Image Generation model.`
                    : "We're processing your video to extract frames for transformation."}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Helper functions to filter frames for different views
  const transformedFrames = frames.filter(frame => frame.type === "transformed" && frame.transformed);
  const originalFrames = frames.filter(frame => frame.type === "original");

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
                <p className="text-sm text-gray-400">
                  {frames.length} frames processed • {prompt.substring(0, 25)}{prompt.length > 25 ? '...' : ''}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/5"
                  onClick={startProcessing}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button className="bg-fusion-primary hover:bg-fusion-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue="frames"
              className="mb-6" 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as "frames" | "comparison" | "gallery")}
            >
              <TabsList className="bg-black/50 border border-white/10">
                <TabsTrigger value="frames" className="data-[state=active]:bg-fusion-primary data-[state=active]:text-white">
                  All Frames
                </TabsTrigger>
                <TabsTrigger value="comparison" className="data-[state=active]:bg-fusion-primary data-[state=active]:text-white">
                  Before & After
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-fusion-primary data-[state=active]:text-white">
                  Gallery
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="frames" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {frames.map((frame) => (
                    <div key={frame.id} className="group relative">
                      <div className="relative overflow-hidden rounded-lg border border-white/10">
                        <img 
                          src={frame.transformed || frame.original as string} 
                          alt={`Frame ${frame.id}`} 
                          className="w-full h-auto object-cover aspect-video"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                          <span className="text-xs font-medium text-white">
                            {frame.type === "original" ? "Original" : "Transformed"}
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
              </TabsContent>
              
              <TabsContent value="comparison" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {transformedFrames.map((frame, index) => {
                    const originalFrame = originalFrames[index % originalFrames.length];
                    return (
                      <div key={frame.id} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative rounded-lg overflow-hidden border border-white/10">
                            <img 
                              src={originalFrame?.original as string} 
                              alt="Original frame" 
                              className="w-full h-auto object-cover aspect-video"
                            />
                            <span className="absolute bottom-2 left-2 text-xs font-medium bg-black/50 rounded-md px-2 py-1 text-white">
                              Before
                            </span>
                          </div>
                          
                          <div className="relative rounded-lg overflow-hidden border border-white/10">
                            <img 
                              src={frame.transformed as string} 
                              alt="Transformed frame" 
                              className="w-full h-auto object-cover aspect-video"
                            />
                            <span className="absolute bottom-2 left-2 text-xs font-medium bg-black/50 rounded-md px-2 py-1 text-white">
                              After
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                            <Download className="mr-2 h-3.5 w-3.5" />
                            Save Pair
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="gallery" className="mt-6">
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                  {frames.map((frame) => (
                    <div key={frame.id} className="break-inside-avoid mb-4">
                      <div className="relative rounded-lg overflow-hidden border border-white/10">
                        <img 
                          src={frame.transformed || frame.original as string} 
                          alt={`Frame ${frame.id}`} 
                          className="w-full h-auto"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <span className="text-xs font-medium text-white">
                            {frame.type === "original" ? "Original" : "Transformed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
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
              {transformedVideo ? (
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fusion-secondary/10 mb-4">
                    <Play className="h-8 w-8 text-fusion-secondary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Transformed Video Ready</h3>
                  <p className="text-gray-400 max-w-lg mx-auto mb-6">
                    Your video has been processed and transformed frames have been compiled into a new video!
                  </p>
                  
                  <div className="relative aspect-video max-w-2xl mx-auto border-2 border-fusion-primary rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                      <Button size="lg" className="bg-fusion-primary hover:bg-fusion-primary/90">
                        <Play className="mr-2 h-5 w-5" />
                        Play Transformed Video
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <Button size="lg" className="bg-fusion-primary hover:bg-fusion-primary/90">
                      <Download className="mr-2 h-5 w-5" />
                      Download Video
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white/10 text-white hover:bg-white/5"
                      onClick={resetProcess}
                    >
                      <Share2 className="mr-2 h-5 w-5" />
                      Start New Project
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fusion-secondary/10 mb-4">
                    <Sparkles className="h-8 w-8 text-fusion-secondary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Ready to Create Video</h3>
                  <p className="text-gray-400 max-w-lg mx-auto">
                    All your frames have been transformed! Would you like to compile them back into a video?
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <Button 
                      size="lg" 
                      className="bg-fusion-primary hover:bg-fusion-primary/90"
                      onClick={() => {
                        // In a real implementation, this would generate the video
                        // For demo purposes, we'll simulate this by setting transformedVideo after a delay
                        setTimeout(() => {
                          const dummyVideoUrl = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA";
                          useVideoProcessing().setTransformedVideo(dummyVideoUrl);
                        }, 2000);
                      }}
                    >
                      <RefreshCcw className="mr-2 h-5 w-5" />
                      Create Video
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white/10 text-white hover:bg-white/5"
                      onClick={resetProcess}
                    >
                      <Share2 className="mr-2 h-5 w-5" />
                      Start New Project
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultsPreview;
