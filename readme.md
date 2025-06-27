# Image to Ingredients Analyzer

This is a web application that allows users to upload an image and receive a detailed analysis of its contents, with a special focus on identifying food ingredients. This project is built with Next.js, TypeScript, and Tailwind CSS, and it uses the OpenAI API for image analysis.

## Features

- **Image Upload:** Users can upload an image from their local machine.
- **Drag and Drop:** Users can drag and drop an image to upload it.
- **Image Analysis:** The application sends the image to the OpenAI API for analysis.
- **Ingredient Identification:** The AI is prompted to identify food ingredients in the image.
- **Markdown Display:** The analysis results are displayed in a clean and readable format using Markdown.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.
- **Secure API Key Handling:** The OpenAI API key is securely handled on the backend, and is not exposed to the client.

## Technical Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI:** [OpenAI API (GPT-4o)](https://openai.com/)
- **UI Components:** [React](https://reactjs.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/image-to-ingredients.git
   ```
2. Navigate to the project directory
   ```sh
   cd image-to-ingredients/food-analyzer
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env.local` file in the `food-analyzer` directory and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your_openai_api_key
    ```
5. Start the development server
    ```sh
    npm run dev
    ```
6. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Upload an image by clicking the upload area or by dragging and dropping an image file.
2. Click the "Analyze Image" button.
3. The analysis results will be displayed on the right side of the screen.


