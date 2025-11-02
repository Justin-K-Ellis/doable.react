"use client";

import { useState } from "react";
import { ITask } from "@/types";
import Title from "./components/Title";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputTask, setInputTask] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newTask: ITask = {
      id: Math.floor(Math.random() * 1000),
      name: inputTask,
    };
    setTasks((tasks) => tasks.concat(newTask));
    setInputTask("");
  }

  return (
    <>
      <Title text="My Tasks" />

      <div id="wrapper" className="md:w-7/10 mx-auto">
        {/* Add tasks */}
        <section id="tasks-form">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center border border-base-300 rounded my-4 py-4">
              <label htmlFor="add-task" className="font-bold text-xl">
                Add Task
              </label>
              <div className="flex flex-row justify-center gap-2">
                <input
                  type="text"
                  id="add-task"
                  value={inputTask}
                  onChange={(e) => setInputTask(e.target.value)}
                  className="input"
                />
                <button type="submit" className="btn btn-success">
                  Add
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Display tasks */}
        <section id="tasks">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Task</th>
                  {/* <th>Update</th> */}
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    {/* <td>
                    <button type="button" className="btn btn-info">
                      Update
                    </button>
                  </td> */}
                    <td>
                      <button type="button" className="btn btn-warning">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
