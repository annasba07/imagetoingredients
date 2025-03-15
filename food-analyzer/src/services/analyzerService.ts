/**
 * Service for analyzing images using a multimodal model
 */

import { analyzeImageWithOpenAI } from './openaiService';

// For future use with an actual API like OpenAI's GPT-4o
interface AnalyzeImageOptions {
  image: File;
  apiKey?: string;
  prompt?: string;
}

/**
 * Analyzes an image using a multimodal model (GPT-4o)
 */
export async function analyzeImage(options: AnalyzeImageOptions): Promise<string> {
  const { image, prompt } = options;
  
  // Use environment variable for API key
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  try {
    // Use the OpenAI integration
    return await analyzeImageWithOpenAI({
      image,
      apiKey,
      prompt: prompt || "Please analyze this image and identify all ingredients or components visible."
    });
  } catch (error) {
    console.error("Error in image analysis:", error);
    
    // Fall back to mock data if there's an error
    if ((error as Error).message.includes('API key')) {
      return `## API Key Error
Please set your OpenAI API key in the .env.local file.

## Example Mock Data
${image.name.toLowerCase().includes('food') ? generateFoodAnalysis() : generateGenericAnalysis()}`;
    }
    
    return `## Error Analyzing Image
There was an error processing your request: ${(error as Error).message}

## Example Mock Data
${image.name.toLowerCase().includes('food') ? generateFoodAnalysis() : generateGenericAnalysis()}`;
  }
}

function generateFoodAnalysis(): string {
  const possibleIngredients = [
    "Flour", "Sugar", "Eggs", "Butter", "Milk", "Chocolate", "Vanilla extract",
    "Baking powder", "Salt", "Olive oil", "Garlic", "Onions", "Tomatoes",
    "Chicken", "Beef", "Rice", "Pasta", "Potatoes", "Carrots", "Bell peppers",
    "Cheese", "Lettuce", "Spinach", "Apples", "Bananas", "Strawberries"
  ];
  
  // Select 4-8 random ingredients
  const numIngredients = Math.floor(Math.random() * 5) + 4;
  const selectedIngredients = [];
  
  for (let i = 0; i < numIngredients; i++) {
    const randomIndex = Math.floor(Math.random() * possibleIngredients.length);
    const ingredient = possibleIngredients[randomIndex];
    
    if (!selectedIngredients.includes(ingredient)) {
      selectedIngredients.push(ingredient);
    }
  }
  
  const ingredientsList = selectedIngredients.map(i => `- ${i}`).join('\n');
  
  // Generate a simple analysis
  let analysis = "";
  if (selectedIngredients.includes("Flour") && selectedIngredients.includes("Sugar")) {
    analysis = "This appears to be ingredients for baking a cake or cookies.";
  } else if (selectedIngredients.includes("Pasta") || selectedIngredients.includes("Rice")) {
    analysis = "These ingredients could be used to prepare a main dish.";
  } else if (selectedIngredients.some(i => ["Lettuce", "Spinach", "Tomatoes"].includes(i))) {
    analysis = "These ingredients would make a nutritious salad.";
  } else {
    analysis = "These ingredients could be combined to create various dishes.";
  }
  
  return `## Detected Ingredients
${ingredientsList}

## Analysis
${analysis} The combination works well together and could create a flavorful dish.`;
}

function generateGenericAnalysis(): string {
  return `## Detected Items
- Item 1
- Item 2
- Item 3
- Item 4
- Item 5

## Analysis
I've analyzed the image and identified several key components. The image contains multiple objects that appear to be related. Without more specific context, I can only provide a general assessment.`;
}