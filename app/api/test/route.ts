import { NextRequest, NextResponse } from "next/server";

const sentences: string[] = ["Hello, route!"];

export async function GET() {
  return Response.json(sentences);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.message && body.message.length > 1) {
    sentences.push(body.message);
    return Response.json({ message: "nice post", post: body.message });
  } else {
    return new NextResponse("Bad request", { status: 400 });
  }
}
