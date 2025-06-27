/**
 * Service for analyzing images by calling the application's backend API
 */

interface AnalyzeImageOptions {
  image: File;
  prompt?: string;
}

/**
 * Analyzes an image by sending it to the backend API
 */
export async function analyzeImage(options: AnalyzeImageOptions): Promise<string> {
  const { image, prompt } = options;
  
  const formData = new FormData();
  formData.append("image", image);
  formData.append("prompt", prompt || "Please analyze this image and identify all ingredients or components visible.");

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;

  } catch (error) {
    console.error("Error in image analysis:", error);
    
    // Fall back to mock data if there's an error
    if (error instanceof Error && error.message.includes('OpenAI API key not configured')) {
      return `## API Key Error
Please ensure your OpenAI API key is set in the .env.local file on the server.

## Example Mock Data
${image.name.toLowerCase().includes('food') ? generateFoodAnalysis() : generateGenericAnalysis()}`;
    }
    
    return `## Error Analyzing Image
There was an error processing your request: ${error instanceof Error ? error.message : 'Unknown error'}

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
  
  const numIngredients = Math.floor(Math.random() * 5) + 4;
  const selectedIngredients = Array.from(
    { length: numIngredients }, 
    () => possibleIngredients[Math.floor(Math.random() * possibleIngredients.length)]
  ).filter((value, index, self) => self.indexOf(value) === index);
  
  const ingredientsList = selectedIngredients.map(i => `- ${i}`).join('\n');
  
  let analysis = "These ingredients could be combined to create various dishes.";
  if (selectedIngredients.includes("Flour") && selectedIngredients.includes("Sugar")) {
    analysis = "This appears to be ingredients for baking a cake or cookies.";
  } else if (selectedIngredients.includes("Pasta") || selectedIngredients.includes("Rice")) {
    analysis = "These ingredients could be used to prepare a main dish.";
  } else if (selectedIngredients.some(i => ["Lettuce", "Spinach", "Tomatoes"].includes(i))) {
    analysis = "These ingredients would make a nutritious salad.";
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