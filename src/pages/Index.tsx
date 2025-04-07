
import React from "react";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import PromptSection from "@/components/PromptSection";
import ResultsPreview from "@/components/ResultsPreview";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-fusion-dark text-white">
      <Navbar />
      <main>
        <Hero />
        <UploadSection />
        <PromptSection />
        <ResultsPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
