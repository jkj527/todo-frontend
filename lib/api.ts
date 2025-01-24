import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getTasks() {
  try {
    const res = await axios.get(`${API_URL}/api/tasks`);
    return res.data;
  } catch (error) {
    console.error("Failed to get tasks:", error);
    throw error;
  }
}

export async function createTask(data: { title: string; color?: string }) {
  try {
    const res = await axios.post(`${API_URL}/api/tasks`, data);
    return res.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
}

export async function editTask(
  id: number,
  data: Partial<{ title: string; color: string; completed: boolean }>,
) {
  try {
    const res = await axios.put(`${API_URL}/api/tasks/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}

export async function deleteTask(id: number) {
  try {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}
