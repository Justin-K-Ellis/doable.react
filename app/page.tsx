"use client";

import { useEffect, useState } from "react";
import { ITask } from "@/types";
import Title from "./components/Title";
import useFetchTasks from "./hooks/useFetchTasks";

export default function Home() {
  const [inputTask, setInputTask] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const { tasks, setTasks, isError, loading } = useFetchTasks();
  const baseUrl = "/api/task";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: inputTask,
          description: inputDescription,
        }),
      });
      if (response.ok) {
        const data: ITask = await response.json();
        setTasks((tasks) => tasks.concat(data));
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInputTask("");
      setInputDescription("");
    }
  }

  async function deleteTask(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      try {
        const response = await fetch(`${baseUrl}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const filteredTasks = tasks.filter((task) => task.id !== id);
          setTasks(filteredTasks);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return;
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

  if (loading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <>
      <Title text="My Tasks" />

      <div id="wrapper" className="md:w-7/10 mx-auto">
        {/* Add tasks */}
        <section id="tasks-form">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center border border-base-300 rounded my-4 py-4 gap-2">
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
              </div>
              <div className="flex flex-col">
                <label htmlFor="add-description" className="font-bold">
                  Description
                </label>
                <input
                  type="text"
                  id="add-description"
                  className="input"
                  value={inputDescription}
                  onChange={(e) => setInputDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add
              </button>
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
                        <td onClick={() => toggleCompleteStatus(task)}>
                          <button
                            type="button"
                            className="btn btn-outline btn-success"
                          >
                            🟢
                          </button>
                        </td>
                        <td>
                          <div>
                            <p>{task.name}</p>
                            <p className="font-light">{task.description}</p>
                          </div>
                        </td>
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
                  <th>Todo</th>
                  <th>Task</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(
                  (task) =>
                    task.done && (
                      <tr key={task.id}>
                        <td onClick={() => toggleCompleteStatus(task)}>
                          <button
                            type="button"
                            className="btn btn-outline btn-info"
                          >
                            🔵
                          </button>
                        </td>
                        <td className="line-through">{task.name}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="btn btn-out btn-warning"
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
