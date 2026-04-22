import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source");

  if (!source) {
    return new NextResponse("Error: Missing source parameter", { status: 400 });
  }

  const urls = source.split("\n").map(url => url.trim()).filter(url => url.startsWith('http'));

  if (urls.length === 0) {
    return new NextResponse("Error: No valid URLs provided", { status: 400 });
  }

  try {
    let combinedContent = "";
    
    // 使用最基础、兼容性最强的 fetch 循环
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: { 
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" 
          },
          // 告诉 Vercel 不要缓存，每次都去抓新的
          cache: 'no-store'
        });

        if (res.ok) {
          const text = await res.text();
          combinedContent += text + "\n";
        }
      } catch (e) {
        console.error("抓取单个链接失败:", url, e);
      }
    }

    if (!combinedContent) {
      return new NextResponse("Error: Could not fetch content from any provided URLs", { status: 502 });
    }

    return new NextResponse(combinedContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    return new NextResponse("Internal Server Error: " + error.message, { status: 500 });
  }
}
