"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTasks, editTask } from "@/lib/api";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("blue");
  const [loading, setLoading] = useState(true);

  const COLORS = ["blue", "red", "green"];

  useEffect(() => {
    loadTask();
  }, []);

  async function loadTask() {
    try {
      const allTasks = await getTasks();
      const taskId = Number(params.taskId);
      const found = allTasks.find((t: any) => t.id === taskId);
      if (!found) {
        alert("Task not found!");
        router.push("/");
        return;
      }
      setTitle(found.title);
      setColor(found.color);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    try {
      const taskId = Number(params.taskId);
      await editTask(taskId, { title, color });
      router.push("/");
    } catch (error) {
      console.error("Error editing task:", error);
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-xl p-4 text-center">
        Loading task data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl p-4 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-2 left-2 text-white flex items-center gap-1"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>

      <form
        onSubmit={handleSubmit}
        className="mt-8 text-white p-4 rounded-md flex flex-col gap-4"
      >
        <div>
          <label className="block mb-2 font-bold">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded text-white bg-lightGray"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-bold">Color</label>
          <div className="flex items-center gap-4">
            {COLORS.map((c) => (
              <div
                key={c}
                onClick={() => setColor(c)}
                className={`
                  w-8 h-8 rounded-full cursor-pointer border-4 
                  border-transparent 
                  ${c === "blue" ? "bg-blue" : ""}
                  ${c === "red" ? "bg-red" : ""}
                  ${c === "green" ? "bg-green" : ""}
                  ${color === c ? "border-white" : ""}
                `}
                title={c}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
}
