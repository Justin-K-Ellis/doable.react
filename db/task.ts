import pool from "./pool";
import { ITask } from "@/types";

class Tasks {
  constructor() {}

  // == Create ==
  async create(name: string, description: string): Promise<ITask> {
    const task = await pool.query(
      `
        INSERT INTO tasks (name, description)
        VALUES ($1, $2)
        RETURNING tasks.id, tasks.name, tasks.done, tasks.description
        `,
      [name, description]
    );
    return task.rows;
  }

  // == Read All ==
  async findMany(): Promise<ITask[]> {
    const tasks = await pool.query(`SELECT * FROM tasks;`);
    return tasks.rows;
  }

  // == Read by Id ==
  async findById(id: number): Promise<ITask> {
    const task = await pool.query(
      `
        SELECT * FROM tasks
        WHERE tasks.id = $1
        `,
      [id]
    );
    return task.rows[0];
  }

  // == Update done status by Id ==
  async updateDoneStatus(id: number, done: boolean): Promise<ITask> {
    const task = await pool.query(
      `
        UPDATE tasks
            SET done = $1
            WHERE id = $2
            RETURNING id, name, done, description
        `,
      [done, id]
    );
    return task.rows;
  }

  // == Delete ==
  async delete(id: number): Promise<void> {
    await pool.query(
      `
        DELETE FROM tasks
            WHERE tasks.id = $1
        `,
      [id]
    );
  }
}

const tasks = new Tasks();

export default tasks;
