import { tasks } from '@/data/tasks';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return Response.json(tasks);
}
