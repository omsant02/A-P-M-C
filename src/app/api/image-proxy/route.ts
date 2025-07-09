import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return new NextResponse('Missing image URL', { status: 400 });
    }
    
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AI-Meme-Coiner/1.0)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/png',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
  } catch (error) {
    console.error('Image proxy error:', error);
    
    const fallbackUrl = `https://via.placeholder.com/400x400/667eea/ffffff?text=🤖+AI+Meme+Loading...`;
    const fallbackResponse = await fetch(fallbackUrl);
    const fallbackBuffer = await fallbackResponse.arrayBuffer();
    
    return new NextResponse(fallbackBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}