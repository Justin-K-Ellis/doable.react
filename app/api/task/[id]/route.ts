import { NextRequest, NextResponse } from "next/server";
import tasks from "../tasks";

// == Task by id ==
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = tasks.filter((t) => t.id === parseInt(id));
  if (task.length === 0) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }
  return NextResponse.json(task);
}
