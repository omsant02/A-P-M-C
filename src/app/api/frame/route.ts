import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple prediction interface
interface Prediction {
  text: string;
  image: string;
  coinSymbol: string;
  price: string;
}

// Simple in-memory storage for demo
let currentPrediction: Prediction = {
  text: "🚀 Bitcoin will break $150K by end of 2025!",
  image: "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=🚀+BTC+150K",
  coinSymbol: "BTC150K",
  price: "$0.05"
};

export async function GET() {
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AI Prediction Meme Coiner</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${currentPrediction.image}" />
        <meta property="fc:frame:button:1" content="🎲 Generate New Prediction" />
        <meta property="fc:frame:button:2" content="💰 Buy ${currentPrediction.coinSymbol}" />
        <meta property="fc:frame:button:3" content="📊 Check Price" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/frame" />
        
        <!-- Open Graph for social sharing -->
        <meta property="og:title" content="AI Prediction Meme Coiner" />
        <meta property="og:description" content="AI generates crypto predictions, creates memes, and makes tradeable coins!" />
        <meta property="og:image" content="${currentPrediction.image}" />
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
          <h1 style="color: #333; margin-bottom: 20px;">🤖 AI Prediction Meme Coiner</h1>
          <img src="${currentPrediction.image}" alt="Prediction Meme" style="width: 100%; border-radius: 10px; margin-bottom: 20px;" />
          <h2 style="color: #555; margin-bottom: 15px;">${currentPrediction.text}</h2>
          <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <strong>${currentPrediction.coinSymbol} Coin: ${currentPrediction.price}</strong>
          </div>
          <p style="color: #777;">Click buttons above in Farcaster to interact!</p>
        </div>
      </body>
    </html>
  `;
  
  return new NextResponse(frameHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    
    // Simple button detection from POST body
    let buttonPressed = 1;
    if (body.includes('button.2')) buttonPressed = 2;
    if (body.includes('button.3')) buttonPressed = 3;
    
    let responseImage = currentPrediction.image;
    let newPrediction = currentPrediction;
    
    if (buttonPressed === 1) {
      // Generate new AI prediction
      const prediction = await generateAIPrediction();
      const image = await generateMemeImage(prediction);
      
      newPrediction = {
        text: prediction,
        image: image,
        coinSymbol: generateCoinSymbol(prediction),
        price: `$${(Math.random() * 0.1 + 0.01).toFixed(3)}`
      };
      
      currentPrediction = newPrediction;
      responseImage = newPrediction.image;
      
    } else if (buttonPressed === 2) {
      // Simulate buy action
      responseImage = `https://via.placeholder.com/400x400/00ff00/ffffff?text=✅+Bought+${currentPrediction.coinSymbol}!`;
      
    } else if (buttonPressed === 3) {
      // Show price info
      responseImage = `https://via.placeholder.com/400x400/0066cc/ffffff?text=${currentPrediction.coinSymbol}+Price:+${currentPrediction.price}`;
    }
    
    const frameResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${responseImage}" />
          <meta property="fc:frame:button:1" content="🎲 Generate New" />
          <meta property="fc:frame:button:2" content="💰 Buy ${newPrediction.coinSymbol}" />
          <meta property="fc:frame:button:3" content="📊 Price" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/frame" />
        </head>
        <body>
          <h1>AI Prediction Meme Coiner</h1>
          <p>${newPrediction.text}</p>
        </body>
      </html>
    `;
    
    return new NextResponse(frameResponse, {
      headers: { 'Content-Type': 'text/html' },
    });
    
  } catch (error) {
    console.error('Frame error:', error);
    
    const errorFrame = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://via.placeholder.com/400x400/ff0000/ffffff?text=Error+Occurred" />
          <meta property="fc:frame:button:1" content="🔄 Try Again" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/frame" />
        </head>
        <body><h1>Error</h1></body>
      </html>
    `;
    
    return new NextResponse(errorFrame, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

async function generateAIPrediction(): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "user",
        content: "Generate a short, bold crypto prediction for 2025. Make it specific and exciting. Format: '[CRYPTO] will [ACTION] by [TIME]'. Example: 'Ethereum will flip Bitcoin by Q3 2025'"
      }],
      max_tokens: 50,
      temperature: 0.9,
    });

    const content = completion.choices[0]?.message?.content;
    return content || "Bitcoin will hit $200K by December 2025!";
  } catch (error) {
    console.error('AI prediction error:', error);
    return "Solana will reach $1000 by end of 2025!";
  }
}

async function generateMemeImage(prediction: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a funny crypto meme image about: "${prediction}". Make it bold, colorful, and shareable. Include relevant crypto symbols and make it look like a viral social media meme.`,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    // Type-safe access to the response
    const data = response.data;
    if (data && data[0] && data[0].url) {
      return data[0].url;
    }
    
    // Fallback to placeholder
    return `https://via.placeholder.com/400x400/1a1a1a/ffffff?text=${encodeURIComponent(prediction)}`;
    
  } catch (error) {
    console.error('Image generation error:', error);
    return `https://via.placeholder.com/400x400/1a1a1a/ffffff?text=${encodeURIComponent(prediction)}`;
  }
}

function generateCoinSymbol(prediction: string): string {
  // Extract key words to create coin symbol
  const words = prediction.toUpperCase().match(/[A-Z]+/g) || [];
  let symbol = '';
  
  for (const word of words) {
    if (['BITCOIN', 'BTC'].includes(word)) symbol += 'BTC';
    else if (['ETHEREUM', 'ETH'].includes(word)) symbol += 'ETH';
    else if (['SOLANA', 'SOL'].includes(word)) symbol += 'SOL';
    else if (word.length >= 3) symbol += word.slice(0, 3);
  }
  
  return symbol.slice(0, 8) || 'PREDICT';
}