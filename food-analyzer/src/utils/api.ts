/**
 * Utility functions for API interactions
 * These will be useful when integrating with the real OpenAI API
 */

/**
 * Converts a File object to a base64 data URL
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Extract just the base64 part, removing the data URL prefix
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * Extracts and formats results from an API response
 */
export function formatAnalysisResult(rawResult: any): string {
  // This would be customized based on the actual API response structure
  if (!rawResult || typeof rawResult !== 'object') {
    return 'Could not parse analysis results.';
  }

  // For a mock or example result
  let formattedResult = '';
  
  // Format detected items
  if (rawResult.items && Array.isArray(rawResult.items)) {
    formattedResult += '## Detected Items\n';
    rawResult.items.forEach((item: string) => {
      formattedResult += `- ${item}\n`;
    });
    formattedResult += '\n';
  }
  
  // Format analysis text
  if (rawResult.analysis && typeof rawResult.analysis === 'string') {
    formattedResult += '## Analysis\n';
    formattedResult += rawResult.analysis;
  }
  
  return formattedResult || 'No analysis results found.';
}