"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { analyzeImage } from "@/services/analyzerService";
import { AnalysisResult } from "@/components/AnalysisResult";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setResults(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setResults(null);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAnalyzeImage = async () => {
    if (!imageFile) return;

    setAnalyzing(true);
    
    try {
      const result = await analyzeImage({
        image: imageFile,
        prompt: "Please analyze this image and identify all ingredients or components visible."
      });
      
      setResults(result);
    } catch (error) {
      setResults("Error analyzing image. Please try again.");
      console.error("Error analyzing image:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        <header className="text-center mt-8 mb-12">
          <h1 className="text-3xl font-bold mb-2">Image Analyzer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload any image to analyze its contents and identify components
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg h-72 flex flex-col items-center justify-center p-4 cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition"
            >
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <>
                  <Image
                    src="/upload-icon.svg"
                    alt="Upload icon"
                    width={48}
                    height={48}
                    className="mb-4 opacity-50"
                  />
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Drag and drop an image here, or click to select
                  </p>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            <button
              onClick={handleAnalyzeImage}
              disabled={!selectedImage || analyzing}
              className="bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzing ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-medium mb-4">Analysis Results</h2>
            <AnalysisResult result={results} loading={analyzing} />
          </div>
        </div>
      </main>
    </div>
  );
}