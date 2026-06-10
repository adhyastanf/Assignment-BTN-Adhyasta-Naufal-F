import { tasks } from '@/data/tasks';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return Response.json(
      {
        statusCode: 404,
        message: 'Task not found',
      },
      {
        status: 404,
      },
    );
  }

  return Response.json(task);
}
