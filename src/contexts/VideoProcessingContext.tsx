import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type VideoInputMethod = "upload" | "url";
type ProcessingStatus = "idle" | "uploading" | "processing" | "transforming" | "complete" | "error";
type ViewMode = "frames" | "comparison" | "gallery";

interface VideoFrame {
  id: string;
  original: string | Blob;
  transformed?: string | Blob;
  type: "original" | "transformed";
  blob?: Blob;
}

interface VideoProcessingContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  inputMethod: VideoInputMethod;
  setInputMethod: (method: VideoInputMethod) => void;
  progress: number;
  setProgress: (progress: number) => void;
  status: ProcessingStatus;
  setStatus: (status: ProcessingStatus) => void;
  frames: VideoFrame[];
  setFrames: (frames: VideoFrame[]) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  startProcessing: () => void;
  resetProcess: () => void;
  validateApiKey: (key: string) => Promise<boolean>;
  transformedVideo: string | null;
  setTransformedVideo: (url: string | null) => void;
}

const VideoProcessingContext = createContext<VideoProcessingContextType | undefined>(undefined);

export const useVideoProcessing = () => {
  const context = useContext(VideoProcessingContext);
  if (!context) {
    throw new Error("useVideoProcessing must be used within a VideoProcessingProvider");
  }
  return context;
};

interface VideoProcessingProviderProps {
  children: ReactNode;
}

export const VideoProcessingProvider: React.FC<VideoProcessingProviderProps> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [inputMethod, setInputMethod] = useState<VideoInputMethod>("upload");
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [frames, setFrames] = useState<VideoFrame[]>([]);
  const [transformedVideo, setTransformedVideo] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => {
    // Try to get API key from localStorage
    const savedKey = localStorage.getItem("video_transform_api_key");
    return savedKey || "";
  });
  const [viewMode, setViewMode] = useState<ViewMode>("frames");
  const { toast } = useToast();

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("video_transform_api_key", apiKey);
    }
  }, [apiKey]);

  // Validate API key with Google AI Studio
  const validateApiKey = async (key: string): Promise<boolean> => {
    // For demo purposes, we'll assume any key longer than 15 characters is valid
    // In a real app, you would make an actual API call to validate
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(key.length >= 15);
      }, 1500);
    });
  };

  // Extract frames from video file or URL
  const extractFrames = async (source: File | string): Promise<Blob[]> => {
    // In a real implementation, you would extract actual frames from the video
    // For this demo, we'll simulate the extraction process
    
    return new Promise((resolve) => {
      let extractionProgress = 0;
      const extractionInterval = setInterval(() => {
        extractionProgress += 5;
        setProgress(extractionProgress);
        
        if (extractionProgress >= 100) {
          clearInterval(extractionInterval);
          
          // Generate 6 placeholder frames (colored rectangles)
          const frameBlobs: Blob[] = [];
          for (let i = 0; i < 6; i++) {
            // Create a canvas to generate a placeholder frame
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 360;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              // Draw a colored rectangle 
              ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              // Add some shape to make frames distinct
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              ctx.beginPath();
              ctx.arc(canvas.width/2, canvas.height/2, 50 + i*10, 0, Math.PI * 2);
              ctx.fill();
              
              // Add frame number
              ctx.fillStyle = 'black';
              ctx.font = '40px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(`Frame ${i+1}`, canvas.width/2, canvas.height/2 + 15);
              
              // Convert to blob
              canvas.toBlob((blob) => {
                if (blob) frameBlobs.push(blob);
                
                // When we have 6 frames, resolve the promise
                if (frameBlobs.length === 6) {
                  resolve(frameBlobs);
                }
              });
            }
          }
        }
      }, 100);
    });
  };

  // Transform a frame using the Google AI Studio Gemini 2.0 Flash model
  const transformFrame = async (frameBlob: Blob, framePrompt: string, apiKey: string): Promise<Blob> => {
    // In a real implementation, you would call the Gemini API
    // For this demo, we'll simulate the transformation process
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a canvas to generate a transformed frame
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 360;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Determine style based on prompt
          let style = 'default';
          const promptLower = framePrompt.toLowerCase();
          if (promptLower.includes('anime') || promptLower.includes('cartoon')) {
            style = 'anime';
          } else if (promptLower.includes('noir') || promptLower.includes('black and white')) {
            style = 'noir';
          } else if (promptLower.includes('watercolor') || promptLower.includes('pastel')) {
            style = 'watercolor';
          } else if (promptLower.includes('van gogh') || promptLower.includes('oil painting')) {
            style = 'vangogh';
          }

          // Draw background
          if (style === 'noir') {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.globalAlpha = 0.3;
            ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
            ctx.globalAlpha = 1;
          } else if (style === 'anime') {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#ff9a9e');
            gradient.addColorStop(1, '#fad0c4');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Anime-style elements
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
            ctx.stroke();
          } else if (style === 'watercolor') {
            const gradient = ctx.createRadialGradient(
              canvas.width/2, canvas.height/2, 50,
              canvas.width/2, canvas.height/2, 300
            );
            gradient.addColorStop(0, '#e6d7c3');
            gradient.addColorStop(1, '#a1c4fd');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Watercolor blotches
            for (let i = 0; i < 5; i++) {
              ctx.fillStyle = `rgba(255, 255, 255, 0.${i+2})`;
              ctx.beginPath();
              ctx.ellipse(
                Math.random() * canvas.width, 
                Math.random() * canvas.height,
                Math.random() * 100 + 50,
                Math.random() * 100 + 30,
                Math.random() * Math.PI,
                0, Math.PI * 2
              );
              ctx.fill();
            }
          } else if (style === 'vangogh') {
            // van Gogh inspired background
            ctx.fillStyle = '#0f2b61';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Swirly patterns
            for (let i = 0; i < 20; i++) {
              ctx.strokeStyle = i % 2 ? '#f4d35e' : '#f0f0f0';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
              
              // Create swirly path
              let x = Math.random() * canvas.width;
              let y = Math.random() * canvas.height;
              for (let j = 0; j < 5; j++) {
                const cpx1 = x + Math.random() * 100 - 50;
                const cpy1 = y + Math.random() * 100 - 50;
                const cpx2 = x + Math.random() * 100 - 50;
                const cpy2 = y + Math.random() * 100 - 50;
                x = x + Math.random() * 100 - 50;
                y = y + Math.random() * 100 - 50;
                ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
              }
              ctx.stroke();
            }
          } else {
            // Default style
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#3b41c5');
            gradient.addColorStop(1, '#a981bb');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          // Add the prompt text to indicate the transformation
          ctx.fillStyle = 'white';
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 4;
          ctx.fillText(`Transformed with: "${framePrompt.substring(0, 30)}${framePrompt.length > 30 ? '...' : ''}"`, canvas.width/2, 30);
          
          // Overlay "Gemini 2.0" text to simulate AI-generated content
          ctx.font = '16px Arial';
          ctx.textAlign = 'right';
          ctx.fillText('Generated by Gemini 2.0', canvas.width - 20, canvas.height - 20);
          
          // Convert to blob
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/jpeg');
        }
      }, 1000 + Math.random() * 2000); // Random delay to simulate processing time
    });
  };

  // Generate a video from frames
  const generateVideo = async (transformedFrames: Blob[]): Promise<string> => {
    // In a real implementation, you would use something like FFmpeg.wasm
    // For this demo, we'll just return a placeholder video URL
    
    return new Promise((resolve) => {
      let compilingProgress = 0;
      const compilingInterval = setInterval(() => {
        compilingProgress += 10;
        setProgress(compilingProgress);
        
        if (compilingProgress >= 100) {
          clearInterval(compilingInterval);
          
          // In a real implementation, we would combine the frames into a video
          // For now, just return a dummy video data URL
          resolve("data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA");
        }
      }, 300);
    });
  };

  // Function to start video processing
  const startProcessing = async () => {
    if (!prompt) {
      toast({
        title: "Missing prompt",
        description: "Please enter a transformation prompt",
        variant: "destructive",
      });
      return;
    }

    if ((inputMethod === "upload" && !file) || (inputMethod === "url" && !videoUrl)) {
      toast({
        title: "No video selected",
        description: "Please upload a video or enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "Missing API key",
        description: "Please enter your Google AI Studio API key in the settings",
        variant: "destructive",
      });
      return;
    }

    try {
      // Start processing
      setStatus("processing");
      setProgress(0);
      setFrames([]);
      
      // 1. Extract frames from video
      toast({
        title: "Extracting frames",
        description: "Breaking down your video into individual frames..."
      });
      
      const videoSource = inputMethod === "upload" ? file! : videoUrl;
      const extractedFrames = await extractFrames(videoSource);
      
      // Update status
      setStatus("transforming");
      setProgress(0);
      
      // Create initial frames array with extracted frames
      const initialFrames = extractedFrames.map((frameBlob, index) => ({
        id: `original-${index}`,
        original: URL.createObjectURL(frameBlob),
        type: "original" as const,
        blob: frameBlob
      }));
      
      setFrames(initialFrames);
      
      // 2. Transform each frame with Gemini 2.0
      toast({
        title: "Transforming frames",
        description: "Applying your prompt to each frame using Gemini 2.0..."
      });
      
      const transformedFrames: VideoFrame[] = [];
      let transformedCount = 0;
      
      for (let i = 0; i < extractedFrames.length; i++) {
        try {
          // Update progress
          setProgress(Math.floor((i / extractedFrames.length) * 100));
          
          // Transform the current frame
          const transformedBlob = await transformFrame(extractedFrames[i], prompt, apiKey);
          
          transformedFrames.push({
            id: `transformed-${i}`,
            original: initialFrames[i].original,
            transformed: URL.createObjectURL(transformedBlob),
            type: "transformed" as const,
            blob: transformedBlob
          });
          
          transformedCount++;
          
          // Update the frames array with the new transformed frame
          setFrames([...initialFrames.slice(0, i+1), ...transformedFrames]);
          
        } catch (error) {
          console.error(`Error transforming frame ${i}:`, error);
        }
      }
      
      if (transformedCount === 0) {
        throw new Error("Failed to transform any frames");
      }
      
      // 3. Compile frames back into a video
      setStatus("processing");
      setProgress(0);
      
      toast({
        title: "Creating video",
        description: "Compiling transformed frames back into a video..."
      });
      
      const transformedFrameBlobs = transformedFrames.map(frame => frame.blob!);
      const videoUrl = await generateVideo(transformedFrameBlobs);
      
      setTransformedVideo(videoUrl);
      
      // Complete processing
      setStatus("complete");
      setProgress(100);
      
      toast({
        title: "Processing complete",
        description: `Successfully transformed ${transformedCount} frames of your video!`
      });
      
    } catch (error) {
      console.error("Processing error:", error);
      setStatus("error");
      
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const resetProcess = () => {
    setFile(null);
    setVideoUrl("");
    setProgress(0);
    setStatus("idle");
    setFrames([]);
    setTransformedVideo(null);
  };

  return (
    <VideoProcessingContext.Provider
      value={{
        file,
        setFile,
        videoUrl,
        setVideoUrl,
        prompt,
        setPrompt,
        inputMethod,
        setInputMethod,
        progress,
        setProgress,
        status,
        setStatus,
        frames,
        setFrames,
        apiKey,
        setApiKey,
        viewMode,
        setViewMode,
        startProcessing,
        resetProcess,
        validateApiKey,
        transformedVideo,
        setTransformedVideo
      }}
    >
      {children}
    </VideoProcessingContext.Provider>
  );
};
