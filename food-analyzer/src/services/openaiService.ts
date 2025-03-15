/**
 * Service for interacting with OpenAI APIs
 * This is configured for the GPT-4o multimodal model
 */

import { OpenAI } from 'openai';
import { fileToBase64 } from '@/utils/api';
import { createConfig, type Config } from './config';

/**
 * Analyze an image using OpenAI's GPT-4o model
 */
export async function analyzeImageWithOpenAI(options: {
  image: File;
  apiKey?: string;
  prompt?: string;
  config?: Partial<Config>;
}): Promise<string> {
  const { image, apiKey, prompt = 'Please analyze this image and identify all ingredients or components visible.', config = {} } = options;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is required. Please set your NEXT_PUBLIC_OPENAI_API_KEY in the .env.local file.');
  }
  
  const fullConfig = createConfig(config);
  const modelName = process.env.NEXT_PUBLIC_OPENAI_MODEL || fullConfig.modelName;
  
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(image);
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Note: In production, you should use a backend
    });
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing images and identifying objects, especially food ingredients. Be thorough and precise in your analysis. Format your response in markdown with headings for different sections.'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: 'high'
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });
    
    // Extract and return the response text
    const result = response.choices[0]?.message?.content || 'No results from analysis';
    return result;
    
  } catch (error) {
    console.error('Error analyzing image with OpenAI:', error);
    throw new Error(`Failed to analyze image with OpenAI API: ${(error as Error).message}`);
  }
}