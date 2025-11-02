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
      done: false,
    };
    setTasks((tasks) => tasks.concat(newTask));
    setInputTask("");
  }

  function deleteTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function toggleCompleteStatus(taskToUpdate: ITask) {
    const updatedTasks: ITask[] = tasks.map((task) => {
      if (task.id === taskToUpdate.id) {
        task.done = !task.done;
        return task;
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
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

        {/* Display todo tasks */}
        <section id="todo-tasks">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
            <h2 className="text-center font-bold text-xl">Todos</h2>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Done</th>
                  <th>Task</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(
                  (task) =>
                    !task.done && (
                      <tr key={task.id}>
                        <td onClick={() => toggleCompleteStatus(task)}>⭕️</td>
                        <td>{task.name}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="btn btn-warning"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Display done tasks */}
        <section id="done-tasks" className="mt-6">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
            <h2 className="text-center font-bold text-xl">Done</h2>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Done</th>
                  <th>Task</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(
                  (task) =>
                    task.done && (
                      <tr key={task.id}>
                        <td onClick={() => toggleCompleteStatus(task)}>⭕️</td>
                        <td className="line-through">{task.name}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="btn btn-warning"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
