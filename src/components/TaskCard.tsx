import Link from 'next/link';

import { Task } from '@/types/task';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import StatusBadge from './ui/StatusBadge';
import PriorityBadge from './ui/PriorityBadge';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{task.id}</CardDescription>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription className='line-clamp-2'>{task.description}</CardDescription>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='flex flex-wrap gap-2'>
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>

        <div>
          <p className='text-xs text-muted-foreground'>Assignee</p>
          <p className='font-medium'>{task.assignee}</p>
        </div>

        <div>
          <p className='text-xs text-muted-foreground'>Due Date</p>
          <p className='font-medium'>{task.dueDate}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className='w-full'>
          <Link href={`/tasks/${task.id}`}>View Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
