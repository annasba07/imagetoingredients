import ReactMarkdown from "react-markdown";
import "@tailwindcss/typography";

interface AnalysisResultProps {
  result: string | null;
  loading: boolean;
}

export function AnalysisResult({ result, loading }: AnalysisResultProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <h3 className="text-lg font-semibold">Welcome to the Image Analyzer</h3>
        <p>
          Upload an image and click "Analyze Image" to see what our AI can
          detect. You can upload images of food to get a list of ingredients, or
          any other image to see a general analysis.
        </p>
        <p>
          The analysis will appear here once it's complete. Get started by
          selecting an image!
        </p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown>{result}</ReactMarkdown>
    </div>
  );
}