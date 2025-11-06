import { NextRequest, NextResponse } from "next/server.js";
import tasks from "../tasks";
import { ITask } from "@/types";

// == Get task by id ==
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = tasks.filter((t) => t.id === parseInt(id));
  console.log(tasks);

  if (task.length === 0) {
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
  const { name, done } = await req.json();

  if (!tasks.some((task) => task.id === parseInt(id))) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const updatedTask: ITask = {
    id: parseInt(id),
    name: name,
    done: done,
  };

  tasks.forEach((task) => {
    if (task.id === parseInt(id)) {
      task = updatedTask;
      console.log("updated task:", task);
    }
  });
  console.log("all tasks:", tasks);

  return NextResponse.json(updatedTask);
}
