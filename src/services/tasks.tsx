
const API_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
export async function fetchTasks() {
  console.log('VERCEL_URL:', process.env.VERCEL_URL);
  console.log('API_URL:', API_URL);
  const res = await fetch(`${API_URL}/api/tasks`);

  return res.json();
}

export async function fetchTaskById(id: string) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`);

  return res.json();
}
