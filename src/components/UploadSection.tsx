
import React, { useState, useCallback } from "react";
import { Upload, UploadCloud, Film, AlertCircle, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const UploadSection: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [inputMethod, setInputMethod] = useState<"upload" | "url">("upload");
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
      return;
    }
    
    handleFile(droppedFile);
  }, [toast]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
      return;
    }
    
    handleFile(selectedFile);
  }, [toast]);

  const handleFile = (file: File) => {
    setFile(file);
    setInputMethod("upload");
    setVideoUrl("");
    setIsUploading(true);
    
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast({
          title: "Upload complete",
          description: "Your video has been uploaded successfully!"
        });
      }
    }, 200);
  };

  const handleVideoUrl = () => {
    if (!videoUrl) {
      toast({
        title: "Empty URL",
        description: "Please enter a video URL",
        variant: "destructive"
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(videoUrl);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }

    setFile(null);
    setInputMethod("url");
    setIsUploading(true);
    
    // Simulate processing progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast({
          title: "Video processed",
          description: "Your video URL has been processed successfully!"
        });
      }
    }, 200);
  };

  const resetForm = () => {
    setFile(null);
    setVideoUrl("");
    setProgress(0);
    setIsUploading(false);
    setInputMethod("upload");
  };

  return (
    <section id="upload-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-purple">
            Upload Your Video
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Drag and drop your video file, click to browse, or enter a video URL.
          </p>
          
          <div className="flex justify-center mt-6 space-x-4">
            <Button 
              variant={inputMethod === "upload" ? "default" : "outline"} 
              onClick={() => setInputMethod("upload")}
              className={inputMethod === "upload" ? "bg-fusion-primary hover:bg-fusion-primary/90" : "border-white/10 text-white hover:bg-white/5"}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
            <Button 
              variant={inputMethod === "url" ? "default" : "outline"} 
              onClick={() => setInputMethod("url")}
              className={inputMethod === "url" ? "bg-fusion-primary hover:bg-fusion-primary/90" : "border-white/10 text-white hover:bg-white/5"}
            >
              <LinkIcon className="mr-2 h-4 w-4" /> Video URL
            </Button>
          </div>
        </div>
        
        <Card 
          className={`border border-white/10 bg-black/30 backdrop-blur-sm p-10 rounded-xl animate-slide-up opacity-0 ${
            isDragging ? "ring-2 ring-fusion-primary" : ""
          }`}
          style={{ animationDelay: '0.5s' }}
          onDragEnter={inputMethod === "upload" ? handleDragEnter : undefined}
          onDragOver={inputMethod === "upload" ? handleDragOver : undefined}
          onDragLeave={inputMethod === "upload" ? handleDragLeave : undefined}
          onDrop={inputMethod === "upload" ? handleDrop : undefined}
        >
          {!file && inputMethod === "upload" && videoUrl === "" && (
            <div className="flex flex-col items-center justify-center space-y-4 py-10">
              <div className="w-20 h-20 rounded-full bg-fusion-primary/10 flex items-center justify-center">
                <UploadCloud className="h-10 w-10 text-fusion-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">
                  Drag & drop your video here
                </p>
                <p className="text-sm text-gray-400">
                  Or click to browse your files
                </p>
              </div>
              <input
                type="file"
                id="video-upload"
                className="hidden"
                accept="video/*"
                onChange={handleFileInput}
              />
              <Button 
                onClick={() => document.getElementById('video-upload')?.click()}
                className="bg-fusion-primary hover:bg-fusion-primary/90"
              >
                <Upload className="mr-2 h-4 w-4" /> Select Video
              </Button>
              <div className="text-xs text-gray-500 flex items-center mt-2">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Maximum file size: 500MB</span>
              </div>
            </div>
          )}
          
          {inputMethod === "url" && !isUploading && (
            <div className="flex flex-col items-center justify-center space-y-4 py-10">
              <div className="w-20 h-20 rounded-full bg-fusion-primary/10 flex items-center justify-center">
                <LinkIcon className="h-10 w-10 text-fusion-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">
                  Enter a video URL
                </p>
                <p className="text-sm text-gray-400">
                  YouTube, Vimeo, or direct video links
                </p>
              </div>
              <div className="w-full max-w-md">
                <Input
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="bg-black/50 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <Button 
                onClick={handleVideoUrl}
                className="bg-fusion-primary hover:bg-fusion-primary/90"
              >
                <LinkIcon className="mr-2 h-4 w-4" /> Process Video
              </Button>
              <div className="text-xs text-gray-500 flex items-center mt-2">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Supported platforms: YouTube, Vimeo, and direct links</span>
              </div>
            </div>
          )}
          
          {(file || (inputMethod === "url" && videoUrl && isUploading)) && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Film className="h-8 w-8 text-fusion-primary" />
                </div>
                <div className="flex-1">
                  {file ? (
                    <>
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-gray-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium truncate">Video from URL</p>
                      <p className="text-sm text-gray-400 truncate">{videoUrl}</p>
                    </>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={resetForm}
                  disabled={isUploading}
                >
                  Remove
                </Button>
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {inputMethod === "upload" ? "Uploading..." : "Processing..."}
                    </span>
                    <span className="text-sm text-gray-400">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-800" />
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default UploadSection;
