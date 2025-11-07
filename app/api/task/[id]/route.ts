import { NextRequest, NextResponse } from "next/server.js";
import tasks from "@/db/task";

// == Get task by id ==
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = await tasks.findById(parseInt(id));

  if (task === undefined) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }
  return NextResponse.json(task);
}

// == Update task by id ==
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { done } = await req.json();

  try {
    const updatedTask = await tasks.updateDoneStatus(parseInt(id), done);
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong when trying to update this task." },
      { status: 500 }
    );
  }
}
