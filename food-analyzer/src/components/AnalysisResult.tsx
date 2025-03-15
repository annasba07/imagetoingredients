import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultProps {
  result: string | null;
  loading: boolean;
}

export function AnalysisResult({ result, loading }: AnalysisResultProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
        <div className="mt-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        Upload an image and click Analyze to see results
      </p>
    );
  }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown>{result}</ReactMarkdown>
    </div>
  );
}