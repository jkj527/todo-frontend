"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/lib/api";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("blue");

  const COLORS = ["blue", "green", "red"];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    try {
      await createTask({ title, color });
      router.push("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  return (
    <div className="w-full max-w-xl p-4 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-2 left-2 text-white flex items-center gap-1"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>

      <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
        <div>
          <label className="block mb-2 font-bold">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded text-white bg-lightGray"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
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
          className="
            mt-6 
            bg-blue 
            text-white 
            px-4 
            py-2 
            rounded-md 
            flex 
            items-center 
            justify-center 
            gap-2
          "
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
