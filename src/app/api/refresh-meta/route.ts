import { NextRequest, NextResponse } from 'next/server';
import config from '@/config/config.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url') || config.site.base_url;
  
  // Add timestamp to force cache refresh
  const timestamp = Date.now();
  
  return NextResponse.json({
    url,
    timestamp,
    cacheBuster: `?v=${timestamp}`,
    telegramRefreshUrl: `https://telegram.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(config.site.title)}`,
    metadata: {
      title: config.site.title,
      description: config.metadata.meta_description,
      image: `${config.site.base_url}${config.metadata.meta_image}?v=${timestamp}`,
    },
    instructions: [
      '1. Use the cacheBuster parameter with your URLs',
      '2. For Telegram: Delete the cached message and resend',
      '3. Wait 5-10 minutes for cache to fully clear',
      '4. Use the telegramRefreshUrl to force refresh'
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, action } = body;
    
    if (action === 'telegram-refresh') {
      // Simulate clearing cache by providing new URLs with timestamps
      const timestamp = Date.now();
      
      return NextResponse.json({
        success: true,
        message: 'Cache refresh initiated',
        newUrl: `${url}?refresh=${timestamp}`,
        imageUrl: `${config.site.base_url}${config.metadata.meta_image}?v=${timestamp}`,
        telegramShareUrl: `https://t.me/share/url?url=${encodeURIComponent(`${url}?refresh=${timestamp}`)}&text=${encodeURIComponent(config.site.title)}`
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
} 