import { NextRequest, NextResponse } from "next/server.js";
import { currentUser, auth } from "@clerk/nextjs/server";
import unauthMsg from "@/app/lib/unAuthMsg";
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

  // Check user auth
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return NextResponse.json(unauthMsg.msg, unauthMsg.status);
  }
  const user = await currentUser();
  if (user === null) {
    return NextResponse.json(unauthMsg.msg, unauthMsg.status);
  }

  try {
    const updatedTask = await tasks.updateDoneStatus(
      parseInt(id),
      done,
      user.id
    );
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong when trying to update this task." },
      { status: 500 }
    );
  }
}

// == Delete task by id ==
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Check user auth
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return NextResponse.json(unauthMsg.msg, unauthMsg.status);
  }
  const user = await currentUser();
  if (user === null) {
    return NextResponse.json(unauthMsg.msg, unauthMsg.status);
  }

  try {
    const task = await tasks.findById(parseInt(id));
    if (task) {
      await tasks.delete(parseInt(id), user.id);
      return NextResponse.json({ status: 204 });
    } else {
      return NextResponse.json(
        { message: "Task does not exist." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong when deleting this task." },
      { status: 500 }
    );
  }
}
