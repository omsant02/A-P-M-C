import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PredictionResult {
  text: string;
  confidence: 'Low' | 'Medium' | 'High';
  timeframe: string;
  category: 'Price' | 'Technology' | 'Adoption' | 'Regulation';
}

export interface MemeImageResult {
  url: string;
  success: boolean;
  error?: string;
}

// Enhanced prediction generation with more variety
export async function generateCryptoPrediction(): Promise<PredictionResult> {
  try {
    const predictionPrompts = [
      "Generate a bold crypto price prediction for 2025. Include specific numbers and timeframes.",
      "Create an exciting prediction about a crypto technology breakthrough in 2025.",
      "Predict a major crypto adoption milestone that could happen this year.",
      "Generate a prediction about crypto regulation or institutional adoption in 2025.",
      "Create a bold prediction about a specific altcoin's performance in 2025."
    ];
    
    const randomPrompt = predictionPrompts[Math.floor(Math.random() * predictionPrompts.length)];
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: "You are a crypto analyst making bold, specific predictions. Be exciting but realistic. Format: '[CRYPTO/EVENT] will [ACTION] by [SPECIFIC TIME]'. Keep it under 60 characters for social media."
      }, {
        role: "user",
        content: randomPrompt
      }],
      max_tokens: 60,
      temperature: 0.8,
    });

    const predictionText = completion.choices[0]?.message?.content || "Bitcoin will reach $150K by December 2025!";
    
    // Analyze prediction characteristics
    const confidence = analyzeConfidence(predictionText);
    const timeframe = extractTimeframe(predictionText);
    const category = categorize(predictionText);
    
    return {
      text: predictionText,
      confidence,
      timeframe,
      category
    };
    
  } catch (error) {
    console.error('AI prediction error:', error);
    
    // Fallback predictions
    const fallbacks = [
      "Bitcoin will hit $200K by end of 2025!",
      "Ethereum will flip Bitcoin by Q3 2025!",
      "Solana will reach $1000 this year!",
      "XRP will hit $10 after regulation clarity!",
      "DeFi TVL will exceed $500B in 2025!"
    ];
    
    const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    
    return {
      text: randomFallback,
      confidence: 'Medium',
      timeframe: '2025',
      category: 'Price'
    };
  }
}

// Generate viral meme image from prediction
export async function generateMemeImage(prediction: string): Promise<MemeImageResult> {
  try {
    const memeStyles = [
      "viral crypto meme with bold text and rocket emojis",
      "pepe the frog style crypto meme",
      "diamond hands meme format",
      "to the moon meme style",
      "wojak crypto trader meme",
      "chad vs virgin crypto meme format"
    ];
    
    const randomStyle = memeStyles[Math.floor(Math.random() * memeStyles.length)];
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a ${randomStyle} about: "${prediction}". Make it colorful, bold, and shareable on social media. Include crypto symbols like Bitcoin logos, rocket ships, or diamond hands. Text should be readable and funny.`,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const data = response.data;
    if (data && data[0] && data[0].url) {
      return {
        url: data[0].url,
        success: true
      };
    }
    
    return {
      url: createFallbackImage(prediction),
      success: false,
      error: 'No image URL returned'
    };
    
  } catch (error) {
    console.error('Image generation error:', error);
    
    return {
      url: createFallbackImage(prediction),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Analyze prediction confidence based on language
function analyzeConfidence(prediction: string): 'Low' | 'Medium' | 'High' {
  const lowConfidenceWords = ['might', 'could', 'possibly', 'maybe', 'potential'];
  const highConfidenceWords = ['will', 'definitely', 'guaranteed', 'certainly', 'absolutely'];
  
  const lowerPrediction = prediction.toLowerCase();
  
  if (highConfidenceWords.some(word => lowerPrediction.includes(word))) {
    return 'High';
  } else if (lowConfidenceWords.some(word => lowerPrediction.includes(word))) {
    return 'Low';
  } else {
    return 'Medium';
  }
}

// Extract timeframe from prediction
function extractTimeframe(prediction: string): string {
  const timeframes = [
    { regex: /2025/i, value: '2025' },
    { regex: /end of year|eoy/i, value: 'End of Year' },
    { regex: /q[1-4]|quarter/i, value: 'This Quarter' },
    { regex: /month|30 days/i, value: 'This Month' },
    { regex: /week|7 days/i, value: 'This Week' },
  ];
  
  for (const timeframe of timeframes) {
    if (timeframe.regex.test(prediction)) {
      return timeframe.value;
    }
  }
  
  return '2025';
}

// Categorize prediction type
function categorize(prediction: string): 'Price' | 'Technology' | 'Adoption' | 'Regulation' {
  const lowerPrediction = prediction.toLowerCase();
  
  if (lowerPrediction.includes('price') || lowerPrediction.includes('$') || /\d+k|\d+m/.test(lowerPrediction)) {
    return 'Price';
  } else if (lowerPrediction.includes('tech') || lowerPrediction.includes('upgrade') || lowerPrediction.includes('protocol')) {
    return 'Technology';
  } else if (lowerPrediction.includes('adoption') || lowerPrediction.includes('mainstream') || lowerPrediction.includes('company')) {
    return 'Adoption';
  } else if (lowerPrediction.includes('regulation') || lowerPrediction.includes('sec') || lowerPrediction.includes('government')) {
    return 'Regulation';
  } else {
    return 'Price';
  }
}

// Create fallback image URL with prediction text
function createFallbackImage(prediction: string): string {
  const encodedPrediction = encodeURIComponent(prediction);
  const colors = ['1a1a1a', '333333', '4a5568', '2d3748', '1a202c'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return `https://via.placeholder.com/400x400/${randomColor}/ffffff?text=${encodedPrediction}`;
}

// Generate trending crypto topics for more relevant predictions
export async function generateTrendingTopics(): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "user",
        content: "List 5 trending crypto topics for 2025. Return as JSON array of strings. Focus on realistic trends like layer 2s, stablecoins, DeFi, NFTs, regulation, etc."
      }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (content) {
      try {
        return JSON.parse(content);
      } catch {
        // Fallback if JSON parsing fails
        return content.split('\n').filter(line => line.trim().length > 0);
      }
    }
    
    return getDefaultTrendingTopics();
    
  } catch (error) {
    console.error('Error generating trending topics:', error);
    return getDefaultTrendingTopics();
  }
}

function getDefaultTrendingTopics(): string[] {
  return [
    'Layer 2 scaling solutions',
    'Central Bank Digital Currencies (CBDCs)',
    'DeFi protocol innovations',
    'Crypto regulation clarity',
    'Institutional Bitcoin adoption'
  ];
}