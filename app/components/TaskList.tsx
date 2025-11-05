import type { ITask } from "@/types";

interface TaskListProps {
  cssId: string;
  title: string;
  tasks: ITask[];
  statusChoice: boolean;
  toggleCompleteStatus: (task: ITask) => void;
  deleteTask: (id: number) => void;
}

export default function TaskList(props: TaskListProps) {
  return (
    <section id={props.cssId}>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
        <h2 className="text-center font-bold text-xl">{props.title}</h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>{props.statusChoice ? "Done" : "Todo"}</th>
              <th>Task</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.tasks.map(
              (task) =>
                task.done === props.statusChoice && (
                  <tr key={task.id}>
                    <td onClick={() => props.toggleCompleteStatus(task)}>
                      <button
                        type="button"
                        className="btn btn-outline btn-success"
                      >
                        🟢
                      </button>
                    </td>
                    <td>{task.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => props.deleteTask(task.id)}
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
  );
}
