
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchTasks() {
  const res = await fetch(`${API_URL}/api/tasks`);

  return res.json();
}

export async function fetchTaskById(id: string) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`);

  return res.json();
}
