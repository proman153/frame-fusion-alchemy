
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

// Sample frame images for demonstration
const sampleFrameImages = [
  "https://images.unsplash.com/photo-1560759226-14da22a643ef?q=80&w=300&h=200&auto=format",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=300&h=200&auto=format",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=300&h=200&auto=format",
  "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=300&h=200&auto=format",
  "https://images.unsplash.com/photo-1552084117-56a987666449?q=80&w=300&h=200&auto=format",
  "https://images.unsplash.com/photo-1487260211189-670c54da558d?q=80&w=300&h=200&auto=format"
];

// Sample transformed images for different styles
const transformationStyles = {
  anime: [
    "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1560140359-766c221d654c?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1514729797186-944d57303199?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1638586641474-95bced5a8cbd?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1559762717-99c81ac85459?q=80&w=300&h=200&auto=format"
  ],
  noir: [
    "https://images.unsplash.com/photo-1573666008508-3946a9a4b8bb?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1557822477-df305058eb9d?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1500817487388-8e3af31c186a?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1602521879205-9c6be0054a1c?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1485089269853-dc9598657b7a?q=80&w=300&h=200&auto=format"
  ],
  watercolor: [
    "https://images.unsplash.com/photo-1595273670150-bd0c3c392886?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1605490013639-40737e989686?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1579541592060-456699c3a21f?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1636368208793-7c6a66ba0e3a?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=300&h=200&auto=format"
  ],
  vangogh: [
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1551732998-9573f695fdbb?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1580136607993-fd598cf5c4f5?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1578393098337-5594779ffd9a?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1598286040167-c5c4f639cbb9?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1607492048450-e50e7afc0dbb?q=80&w=300&h=200&auto=format"
  ],
  default: [
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1633109740813-3716b3f85520?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1580810734861-35a7b3989b7b?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1616668058889-c7720e8d970f?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1635402156695-6fb7b7aa32fa?q=80&w=300&h=200&auto=format",
    "https://images.unsplash.com/photo-1633957897986-70e83293a3da?q=80&w=300&h=200&auto=format"
  ]
};

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

  // Helper function to determine which transformation style to use based on prompt
  const getTransformationStyle = (promptText: string): string => {
    promptText = promptText.toLowerCase();
    
    if (promptText.includes('anime') || promptText.includes('cartoon')) {
      return 'anime';
    } else if (promptText.includes('noir') || promptText.includes('black and white')) {
      return 'noir';
    } else if (promptText.includes('watercolor') || promptText.includes('pastel')) {
      return 'watercolor';
    } else if (promptText.includes('van gogh') || promptText.includes('oil painting')) {
      return 'vangogh';
    } else {
      return 'default';
    }
  };

  // Function to start video processing
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
        
        // Determine which transformation style to use based on the prompt
        const style = getTransformationStyle(prompt);
        const transformedImages = transformationStyles[style as keyof typeof transformationStyles] || transformationStyles.default;
        
        // Generate mock frames with real images
        const mockFrames: VideoFrame[] = [];
        for (let i = 0; i < 6; i++) {
          // Add original frame
          mockFrames.push({
            id: `original-${i}`,
            original: sampleFrameImages[i % sampleFrameImages.length],
            type: "original"
          });
          
          // Add transformed frame
          mockFrames.push({
            id: `transformed-${i}`,
            original: sampleFrameImages[i % sampleFrameImages.length],
            transformed: transformedImages[i % transformedImages.length],
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
