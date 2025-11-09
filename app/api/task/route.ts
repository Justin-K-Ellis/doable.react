import { NextRequest, NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";
import tasks from "@/db/task";

// == Create ==
export async function POST(req: NextRequest) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();

  try {
    const { name, description } = await req.json();
    const newTask = await tasks.create(name, description, user.id);
    return NextResponse.json(newTask, { status: 201 });
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
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();

  try {
    const allTasks = await tasks.findMany(user.id);
    return NextResponse.json(allTasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong when fetching all tasks." },
      { status: 500 }
    );
  }
}
