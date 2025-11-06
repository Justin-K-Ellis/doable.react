import pool from "./pool";
import { ITask } from "@/types";

class Tasks {
  constructor() {}

  // == Create ==

  // == Read All ==
  async findMany(): Promise<ITask[]> {
    const tasks: ITask[] = await pool.query(`SELECT * FROM tasks;`);
    return tasks;
  }

  // == Read by Id ==
  async findById(id: number): Promise<ITask> {
    const task: ITask = await pool.query(
      `
        SELECT * FROM tasks
        WHERE tasks.id = $1
        `,
      [id]
    );
    return task;
  }

  // == Update by Id ==

  // == Delete ==
}

const tasks = new Tasks();

export default tasks;
