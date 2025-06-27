import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const prompt = formData.get("prompt") as string;

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500 }
      );
    }

    if (!image) {
      return new NextResponse(JSON.stringify({ error: "No image provided" }), {
        status: 400,
      });
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const base64Image = imageBuffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at analyzing images and identifying objects, especially food ingredients. Be thorough and precise in your analysis. Format your response in markdown with headings for different sections.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${image.type};base64,${base64Image}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const result = response.choices[0]?.message?.content;
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error analyzing image with OpenAI:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}