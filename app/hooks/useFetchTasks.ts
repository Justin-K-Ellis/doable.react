import type { ITask } from "@/types";
import React, { useEffect, useState } from "react";

interface IFetchTasks {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  isError: boolean;
  loading: boolean;
}

export default function useFetchTasks(): IFetchTasks {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const url = "/api/task";

  useEffect(() => {
    async function fetchTasks(): Promise<void> {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data: ITask[] = await response.json();
          setTasks(data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  return { tasks, setTasks, isError, loading };
}
