
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type VideoInputMethod = "upload" | "url";
type ProcessingStatus = "idle" | "uploading" | "processing" | "complete" | "error";
type ViewMode = "frames" | "comparison" | "gallery";

interface VideoFrame {
  id: string;
  original: string;
  transformed?: string;
  type: "original" | "transformed";
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

  // Mock video processing function (in a real app, this would connect to a backend API)
  const startProcessing = () => {
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
        description: "Please enter your API key in the settings",
        variant: "destructive",
      });
      return;
    }

    // Set status to processing
    setStatus("processing");
    setProgress(0);
    
    // Simulate frame extraction process
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress >= 50) {
        clearInterval(progressInterval);
        
        // Generate mock frames
        const mockFrames: VideoFrame[] = [];
        for (let i = 1; i <= 6; i++) {
          mockFrames.push({
            id: `original-${i}`,
            original: `https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Original+Frame+${i}`,
            type: "original"
          });
          
          mockFrames.push({
            id: `transformed-${i}`,
            original: `https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Original+Frame+${i}`,
            transformed: `https://via.placeholder.com/300x200/6C63FF/ffffff?text=Transformed+${i}`,
            type: "transformed"
          });
        }
        
        // Simulate API processing for transforms using the API key
        const transformInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(currentProgress);
          
          if (currentProgress >= 100) {
            clearInterval(transformInterval);
            setFrames(mockFrames);
            setStatus("complete");
            toast({
              title: "Processing complete",
              description: "All frames have been transformed successfully!"
            });
          }
        }, 100);
      }
    }, 100);
  };

  const resetProcess = () => {
    setFile(null);
    setVideoUrl("");
    setProgress(0);
    setStatus("idle");
    setFrames([]);
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
        resetProcess
      }}
    >
      {children}
    </VideoProcessingContext.Provider>
  );
};
