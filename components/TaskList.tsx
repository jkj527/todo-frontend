"use client";

import { useState, useEffect } from "react";
import { getTasks } from "@/lib/api";
import TaskCard from "./TaskCard";

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleUpdate() {
    loadTasks();
  }

  if (loading) {
    return (
      <div className="mt-8 text-black rounded-md p-4 text-center">
        <p>Loading tasks...</p>
      </div>
    );
  }

  const uncompletedTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const totalTasks = tasks.length;
  const totalCompleted = completedTasks.length;

  return (
    <div className="mt-8 text-black rounded-md p-4">
      {/* task info */}
      <div className="mb-4 px-4 flex justify-between">
        <span className="text-blue font-bold">Tasks: {totalTasks}</span>
        <span className="text-purple font-bold">
          Completed: {totalCompleted} of {totalTasks}
        </span>
      </div>

      {totalTasks === 0 ? (
        <p className="text-center text-white/50">
          You don't have any tasks registered yet.
        </p>
      ) : (
        <>
          {/* uncompleted */}
          {uncompletedTasks.length > 0 ? (
            <div className="space-y-2 mb-6">
              {uncompletedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={handleUpdate} />
              ))}
            </div>
          ) : (
            <div className="text-center text-white/50 mb-6">
              You don't have any active tasks. Create a new task to get started.
            </div>
          )}

          {/* completed */}
          {completedTasks.length > 0 && (
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={handleUpdate} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
