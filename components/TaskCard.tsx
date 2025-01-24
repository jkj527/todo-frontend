"use client";

import Link from "next/link";
import { deleteTask, editTask } from "@/lib/api";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

const COLOR_MAP: Record<string, string> = {
  blue: "border-blue",
  red: "border-red",
  green: "border-green",
};

function getBorderClass(color: string) {
  return COLOR_MAP[color] || "border-lightGray";
}

export default function TaskCard({
  task,
  onUpdate,
}: {
  task: Task;
  onUpdate: () => void;
}) {
  async function handleToggle() {
    try {
      await editTask(task.id, { completed: !task.completed });
      onUpdate();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(task.id);
      onUpdate();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const checkboxClass = task.completed
    ? "bg-purple border-purple"
    : getBorderClass(task.color);

  return (
    <div
      className="
        bg-gray text-white rounded-md p-3 
        flex items-center justify-between 
        border border-lightGray
      "
    >
      <div className="flex items-center gap-3">
        {/* Circle Checkbox */}
        <button
          onClick={handleToggle}
          className={`
            w-6 h-6 
            rounded-full 
            border-2 
            flex items-center justify-center
            transition-colors
            ${checkboxClass}
          `}
        >
          {task.completed && <CheckIcon className="w-4 h-4 text-white" />}
        </button>

        {/* task title is edit link */}
        <Link href={`/edit/${task.id}`} className="hover:underline">
          <p
            className={task.completed ? "line-through text-white/50" : ""}
            title="Click to edit"
          >
            {task.title}
          </p>
        </Link>
      </div>

      <button onClick={handleDelete} className="p-1 text-red">
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
