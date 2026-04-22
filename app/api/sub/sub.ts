import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source");

  if (!source) {
    return new NextResponse("Missing source parameter", { status: 400 });
  }

  const sources = source.split("\n").filter(s => s.trim() !== "");
  let combinedContent = "";

  try {
    for (const s of sources) {
      const response = await fetch(s, {
        headers: {
          "User-Agent": "ClashConverter",
        },
      });
      if (response.ok) {
        const text = await response.text();
        combinedContent += text + "\n";
      }
    }

    const headers = new Headers({
      "Content-Type": "text/plain;charset=utf-8",
      "Cache-Control": "no-cache",
    });

    return new NextResponse(combinedContent, { headers });

  } catch (error) {
    return new NextResponse("Error fetching subscription content.", { status: 500 });
  }
}
