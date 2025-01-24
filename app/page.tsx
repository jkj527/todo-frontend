"use client";

import Link from "next/link";
import TaskList from "@/components/TaskList";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  return (
    <div className="w-full max-w-xl p-4">
      {/* create task button */}
      <Link
        href="/create"
        className="
          absolute
          -top-5  
          left-1/2
          -translate-x-1/2
          bg-blue 
          text-white 
          px-4 py-2 
          rounded-md 
          flex 
          items-center 
          justify-center 
          gap-2
          w-1/2 
          sm:w-1/3
        "
      >
        Create Task
        <PlusCircledIcon className="w-5 h-5" />
      </Link>

      <TaskList />
    </div>
  );
}
