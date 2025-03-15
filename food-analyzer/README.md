# Image Analyzer

A web application that analyzes images using OpenAI's GPT-4o multimodal model to identify objects, ingredients, components, and more.

## Features

- Upload images via drag-and-drop or file browser
- Analyze any type of image to identify its contents
- Get detailed analysis and identification of components
- Responsive interface that works on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- OpenAI API key (for GPT-4o access)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd food-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` to add your OpenAI API key.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Upload an image by dragging and dropping it onto the upload area or by clicking to open the file browser.
2. Click "Analyze Image" to process the image.
3. View the results in the analysis panel on the right.

## Integration with OpenAI

This project uses OpenAI's GPT-4o model for image analysis. To use the real API:

1. Get an API key from [OpenAI's platform](https://platform.openai.com/api-keys)
2. Add your API key to `.env.local`
3. Make sure you have access to the GPT-4o model in your OpenAI account

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [OpenAI API](https://platform.openai.com/) - For image analysis using GPT-4o