"use client";

import { useState } from "react";
import Title from "./components/Title";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([
    "Add test tasks",
    "Add a second task",
  ]);

  return (
    <>
      <Title text="My Tasks" />

      {/* Add tasks */}
      <form>
        <div className="">
          <label htmlFor="add-task">Add Task</label>
          <input type="text" id="add-task" />
        </div>
      </form>

      {/* Display tasks */}
      <section id="tasks">
        <div className="overflow-x-auto rounded-box border border-base-content/5 md:w-7/10 mx-auto bg-base-200">
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
                <tr key={task}>
                  <td>{task}</td>
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
    </>
  );
}
