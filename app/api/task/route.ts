import { NextRequest, NextResponse } from "next/server";
import type { ITask } from "@/types";
import tasks from "./tasks";

// == Create ==
export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const newTask: ITask = {
    id: Math.ceil(Math.random() * 1000),
    name: name,
    done: false,
  };
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

// == Read all tasks ==
export async function GET() {
  return NextResponse.json(tasks);
}
