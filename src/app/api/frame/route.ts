import { NextRequest, NextResponse } from 'next/server';
import { generateCryptoPrediction, generateMemeImage } from '@/lib/ai';
import { createPredictionCoin, buyCoin, getCoinPrice, createCoinMetadata } from '@/lib/zora';
import { Prediction } from '@/lib/types';
import { Address } from 'viem';

// Enhanced prediction with full metadata
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
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
          <h1 style="color: #333; margin-bottom: 20px;">🤖 AI Prediction Meme Coiner</h1>
          <img src="${currentPrediction.image}" alt="Prediction Meme" style="width: 100%; border-radius: 10px; margin-bottom: 20px;" />
          <h2 style="color: #555; margin-bottom: 15px;">${currentPrediction.text}</h2>
          <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <strong>${currentPrediction.coinSymbol} Coin: ${currentPrediction.price}</strong>
            <div style="font-size: 12px; color: #666; margin-top: 5px;">
              Confidence: ${currentPrediction.confidence} • ${currentPrediction.category} • ${currentPrediction.timeframe}
            </div>
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
    
    // Parse frame data (simplified)
    let buttonPressed = 1;
    if (body.includes('button.2')) buttonPressed = 2;
    if (body.includes('button.3')) buttonPressed = 3;
    if (body.includes('button.4')) buttonPressed = 4;
    
    let responseImage = currentPrediction.image;
    let newPrediction = currentPrediction;
    let statusMessage = '';
    
    if (buttonPressed === 1) {
      // Generate new AI prediction with real AI
      console.log('🧠 Generating new AI prediction...');
      
      const aiPrediction = await generateCryptoPrediction();
      console.log('✅ AI prediction generated:', aiPrediction.text);
      
      // Generate meme image
      console.log('🎨 Generating meme image...');
      const memeResult = await generateMemeImage(aiPrediction.text);
      console.log('✅ Meme generated:', memeResult.success ? 'Success' : 'Failed');
      
      // Create coin metadata
      const metadata = createCoinMetadata(aiPrediction.text, memeResult.url);
      
      // Create Zora coin
      console.log('🪙 Creating Zora coin...');
      const coinResult = await createPredictionCoin({
        name: metadata.name,
        symbol: metadata.symbol,
        description: metadata.description,
        image: memeResult.url,
        payoutRecipient: '0x742d35Cc6634C0532925a3b8D926F2E4F4c4e5b0' as Address // Demo address
      });
      
      if (coinResult.success) {
        console.log('✅ Coin created successfully!', coinResult.coinAddress);
        statusMessage = '🎉 New coin created!';
      } else {
        console.log('❌ Coin creation failed:', coinResult.error);
        statusMessage = '⚠️ Coin creation simulated';
      }
      
      newPrediction = {
        id: Date.now().toString(),
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
      
      currentPrediction = newPrediction;
      responseImage = memeResult.url;
      
    } else if (buttonPressed === 2) {
      // Buy coin
      console.log('💰 Processing buy order...');
      
      if (currentPrediction.coinAddress) {
        const buyResult = await buyCoin(currentPrediction.coinAddress, '0.01');
        if (buyResult.success) {
          statusMessage = '✅ Purchase successful!';
          responseImage = `https://via.placeholder.com/400x400/00ff00/ffffff?text=✅+Bought+${currentPrediction.coinSymbol}!+TX:+${buyResult.transactionHash?.slice(0, 8)}...`;
        } else {
          statusMessage = '❌ Purchase failed';
          responseImage = `https://via.placeholder.com/400x400/ff6b6b/ffffff?text=❌+Purchase+Failed`;
        }
      } else {
        statusMessage = '⚠️ Demo buy completed';
        responseImage = `https://via.placeholder.com/400x400/00ff00/ffffff?text=✅+Demo+Buy+${currentPrediction.coinSymbol}!`;
      }
      
    } else if (buttonPressed === 3) {
      // Check current price
      console.log('📊 Fetching current price...');
      
      const currentPrice = currentPrediction.coinAddress 
        ? await getCoinPrice(currentPrediction.coinAddress)
        : currentPrediction.price;
      
      // Update price with some simulation
      const priceChange = (Math.random() - 0.5) * 0.02;
      const newPrice = parseFloat(currentPrice.replace('$', '')) + priceChange;
      currentPrediction.price = `$${Math.max(0.0001, newPrice).toFixed(4)}`;
      
      responseImage = `https://via.placeholder.com/400x400/0066cc/ffffff?text=${currentPrediction.coinSymbol}+Price:+${currentPrediction.price}+${priceChange > 0 ? '📈' : '📉'}`;
      statusMessage = `💹 ${currentPrediction.coinSymbol}: ${currentPrediction.price}`;
      
    } else if (buttonPressed === 4) {
      // Refresh current prediction
      responseImage = currentPrediction.image;
      statusMessage = '🔄 Refreshed!';
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