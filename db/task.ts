import pool from "./pool";
import { ITask } from "@/types";

class Tasks {
  constructor() {}

  async findMany(): Promise<ITask[]> {
    const tasks: ITask[] = await pool.query(`SELECT * FROM tasks;`);
    return tasks;
  }
}

const tasks = new Tasks();

export default tasks;
