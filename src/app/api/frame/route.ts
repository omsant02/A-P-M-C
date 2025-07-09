// Replace your frame route with this async solution
import { NextRequest, NextResponse } from 'next/server';
import { generateCryptoPrediction, generateMemeImage } from '@/lib/ai';
import { createPredictionCoin, buyCoin, getCoinPrice, createCoinMetadata } from '@/lib/zora';
import { Prediction } from '@/lib/types';
import { Address } from 'viem';

const pendingGenerations = new Map<string, {
  prediction: Prediction;
  status: 'generating' | 'complete' | 'failed';
  startTime: number;
}>();

let currentPrediction: Prediction = {
  id: '1',
  text: "🚀 Bitcoin will break $150K by end of 2025!",
  image: "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=🚀+BTC+150K",
  coinSymbol: "BTC150K",
  price: "$0.05",
  confidence: 'High',
  timeframe: '2025',
  category: 'Price',
  createdAt: new Date(),
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
        <meta property="fc:frame:button:4" content="🔄 Refresh" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/frame" />
        
        <!-- Open Graph for social sharing -->
        <meta property="og:title" content="AI Prediction Meme Coiner" />
        <meta property="og:description" content="AI generates crypto predictions, creates memes, and makes tradeable coins!" />
        <meta property="og:image" content="${currentPrediction.image}" />
      </head>
      <body>
        <div style="text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <h1>🤖 AI Prediction Meme Coiner</h1>
          <p>Click buttons above in Farcaster to interact!</p>
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
    console.log('📨 Frame POST request received');
    
    const body = await req.text();
    console.log('📝 Request body:', body);
    
    let buttonPressed = 1;
    if (body.includes('buttonIndex=2') || body.includes('button.2')) {
      buttonPressed = 2;
    } else if (body.includes('buttonIndex=3') || body.includes('button.3')) {
      buttonPressed = 3;
    } else if (body.includes('buttonIndex=4') || body.includes('button.4')) {
      buttonPressed = 4;
    }
    
    console.log('🔘 Button pressed:', buttonPressed);
    
    let responseImage = currentPrediction.image;
    let newPrediction = currentPrediction;
    let statusMessage = '';
    let buttonText = "🎲 Generate New";
    
    if (buttonPressed === 1) {
      console.log('🧠 Starting async AI generation...');
      
      const generationId = Date.now().toString();
      
      startAsyncGeneration(generationId);
      
      responseImage = `https://via.placeholder.com/400x400/667eea/ffffff?text=🤖+AI+is+generating...+Click+refresh+in+5+seconds!`;
      statusMessage = '🔄 Generating AI prediction...';
      buttonText = "🔄 Check Status";
      
    } else if (buttonPressed === 2) {
      console.log('💰 Processing buy order...');
      
      if (currentPrediction.coinAddress) {
        const buyResult = await buyCoin(currentPrediction.coinAddress, '0.01');
        if (buyResult.success) {
          statusMessage = '✅ Purchase successful!';
          responseImage = `https://via.placeholder.com/400x400/00ff00/ffffff?text=✅+Bought+${currentPrediction.coinSymbol}!`;
        } else {
          statusMessage = '❌ Purchase failed';
          responseImage = `https://via.placeholder.com/400x400/ff6b6b/ffffff?text=❌+Purchase+Failed`;
        }
      } else {
        statusMessage = '⚠️ Demo buy completed';
        responseImage = `https://via.placeholder.com/400x400/00ff00/ffffff?text=✅+Demo+Buy+${currentPrediction.coinSymbol}!`;
      }
      
    } else if (buttonPressed === 3) {
      console.log('📊 Fetching current price...');
      
      const currentPrice = currentPrediction.coinAddress 
        ? await getCoinPrice(currentPrediction.coinAddress)
        : currentPrediction.price;
      
      const priceChange = (Math.random() - 0.5) * 0.02;
      const newPrice = parseFloat(currentPrice.replace('$', '')) + priceChange;
      currentPrediction.price = `$${Math.max(0.0001, newPrice).toFixed(4)}`;
      
      responseImage = `https://via.placeholder.com/400x400/0066cc/ffffff?text=${currentPrediction.coinSymbol}+Price:+${currentPrediction.price}`;
      statusMessage = `💹 ${currentPrediction.coinSymbol}: ${currentPrediction.price}`;
      
    } else if (buttonPressed === 4) {
  console.log('🔄 Checking for completed generations...');
  
  let completedGeneration: { id: string; generation: { prediction: Prediction; status: string; startTime: number } } | null = null;
  for (const [genId, gen] of pendingGenerations.entries()) {
    if (gen.status === 'complete') {
      completedGeneration = { id: genId, generation: gen };
      break;
    }
  }
  
  if (completedGeneration) {
    console.log('✅ Found completed generation:', completedGeneration.id);
    
    newPrediction = completedGeneration.generation.prediction;
    currentPrediction = newPrediction;
    responseImage = newPrediction.image;
    statusMessage = '🎉 New AI prediction ready!';
    
    pendingGenerations.delete(completedGeneration.id);
    
  } else {
    const generatingCount = Array.from(pendingGenerations.values())
      .filter(gen => gen.status === 'generating').length;
    
    if (generatingCount > 0) {
      responseImage = `https://via.placeholder.com/400x400/ff9800/ffffff?text=🤖+Still+generating...+Try+again+in+5+seconds!`;
      statusMessage = '⏳ AI is still working...';
      buttonText = "🔄 Check Again";
    } else {
      responseImage = currentPrediction.image;
      statusMessage = '🔄 Refreshed!';
    }
  }
}
    
    console.log('📤 Sending frame response with image:', responseImage);
    
    const frameResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${responseImage}" />
          <meta property="fc:frame:button:1" content="${buttonText}" />
          <meta property="fc:frame:button:2" content="💰 Buy ${newPrediction.coinSymbol}" />
          <meta property="fc:frame:button:3" content="📊 Price" />
          <meta property="fc:frame:button:4" content="🔄 Refresh" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL}/api/frame" />
        </head>
        <body>
          <h1>AI Prediction Meme Coiner</h1>
          <p>${newPrediction.text}</p>
          <p><strong>${statusMessage}</strong></p>
          <p>Confidence: ${newPrediction.confidence} | Category: ${newPrediction.category}</p>
        </body>
      </html>
    `;
    
    return new NextResponse(frameResponse, {
      headers: { 'Content-Type': 'text/html' },
    });
    
  } catch (error) {
    console.error('❌ Frame error:', error);
    
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

// Async generation function - runs in background
async function startAsyncGeneration(generationId: string) {
  try {
    console.log(`🚀 Starting async generation ${generationId}`);
    
    // Mark as generating
    pendingGenerations.set(generationId, {
      prediction: currentPrediction,
      status: 'generating',
      startTime: Date.now()
    });
    
    const aiPrediction = await generateCryptoPrediction();
    console.log(`✅ AI prediction generated for ${generationId}:`, aiPrediction.text);
    
    // Generate meme image (this takes 5-10 seconds)
    const memeResult = await generateMemeImage(aiPrediction.text);
    console.log(`✅ Meme generated for ${generationId}:`, { 
      success: memeResult.success, 
      url: memeResult.url 
    });
    
    const metadata = createCoinMetadata(aiPrediction.text, memeResult.url);
    
    const coinResult = await createPredictionCoin({
      name: metadata.name,
      symbol: metadata.symbol,
      description: metadata.description,
      image: memeResult.url,
      payoutRecipient: '0x742d35Cc6634C0532925a3b8D926F2E4F4c4e5b0' as Address
    });
    
    const newPrediction: Prediction = {
      id: generationId,
      text: aiPrediction.text,
      image: memeResult.url,
      coinSymbol: metadata.symbol,
      coinAddress: coinResult.coinAddress,
      price: `$${(Math.random() * 0.1 + 0.01).toFixed(4)}`,
      confidence: aiPrediction.confidence,
      timeframe: aiPrediction.timeframe,
      category: aiPrediction.category,
      createdAt: new Date(),
      transactionHash: coinResult.transactionHash
    };
    
    pendingGenerations.set(generationId, {
      prediction: newPrediction,
      status: 'complete',
      startTime: Date.now()
    });
    
    console.log(`🎉 Generation ${generationId} completed successfully!`);
    
  } catch (error) {
    console.error(`❌ Generation ${generationId} failed:`, error);
    
    pendingGenerations.set(generationId, {
      prediction: currentPrediction,
      status: 'failed',
      startTime: Date.now()
    });
  }
}