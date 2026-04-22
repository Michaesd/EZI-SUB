import { NextRequest, NextResponse } from "next/server";

// --- 关键修改：删除之前的 'edge' 配置，让它使用 Vercel 最稳定的标准 Serverless 环境 ---
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source");

    if (!source) {
      return new NextResponse("错误：未提供订阅链接 (source 参数缺失)", { status: 400 });
    }

    // 处理多个链接
    const urls = source.split("\n").map(url => url.trim()).filter(url => url.startsWith('http'));

    if (urls.length === 0) {
      return new NextResponse("错误：提供的链接格式不正确，必须以 http(s) 开头", { status: 400 });
    }

    // 逐个抓取内容
    let combinedContent = "";
    for (const url of urls) {
      try {
        const response = await fetch(url, {
          headers: { "User-Agent": "ClashConverter" },
          // 设置 10 秒超时
          signal: AbortSignal.timeout(10000) 
        });

        if (response.ok) {
          const text = await response.text();
          combinedContent += text + "\n";
        }
      } catch (err) {
        console.error(`无法抓取链接: ${url}`, err);
        // 单个链接失败不中断，继续下一个
      }
    }

    if (!combinedContent) {
      return new NextResponse("错误：无法从提供的链接中获取任何内容，请检查链接是否有效", { status: 502 });
    }

    // 返回合并后的内容
    return new NextResponse(combinedContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });

  } catch (error: any) {
    console.error("服务器内部错误:", error);
    return new NextResponse(`服务器内部错误: ${error.message}`, { status: 500 });
  }
}
