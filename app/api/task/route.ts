import { NextRequest, NextResponse } from "next/server";
// import type { ITask } from "@/types";
import tasks from "@/db/task";

// == Create ==
export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();
    const newTask = await tasks.create(name, description);
    return NextResponse.json(newTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong when trying to create a new task." },
      { status: 500 }
    );
  }
}

// == Read all tasks ==
export async function GET() {
  try {
    const allTasks = await tasks.findMany();
    return NextResponse.json(allTasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Somethign went wrong when fetching all tasks." },
      { status: 500 }
    );
  }
}
