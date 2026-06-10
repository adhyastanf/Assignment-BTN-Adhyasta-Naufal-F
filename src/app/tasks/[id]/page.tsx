import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, Calendar, Clock3, User } from 'lucide-react';

import { fetchTaskById } from '@/services/tasks';

import StatusBadge from '@/components/ui/StatusBadge';
import PriorityBadge from '@/components/ui/PriorityBadge';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import DetailSkeleton from '@/components/ui/LoadingState/DetailSkeleton';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: TaskDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const task = await fetchTaskById(id);

  if (!task) {
    return {
      title: "Task Not Found",
      description: "The requested task could not be found.",
    };
  }

  return {
    title: `${task.id} | ${task.title}`,
    description: task.description,
  };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;

  return (
    <main className='mx-auto max-w-4xl py-8'>
      <Suspense fallback={<DetailSkeleton />}>
        <TaskDetailContent id={id} />
      </Suspense>
    </main>
  );
}

async function TaskDetailContent({ id }: TaskDetailContentProps) {
  const task = await fetchTaskById(id);

  if (!task?.id) {
    notFound();
  }

  const cards = [
    {
      title: 'Assignee',
      icon: <User className='h-5 w-5 text-muted-foreground' />,
      value: task.assignee,
    },
    {
      title: 'Created Date',
      icon: <Clock3 className='h-5 w-5 text-muted-foreground' />,
      value: task.createdAt,
    },
    {
      title: 'Due Date',
      icon: <Calendar className='h-5 w-5 text-muted-foreground' />,
      value: task.dueDate,
    },
  ];
  return (
    <Card>
      <CardHeader className='space-y-6'>
        <Button variant='ghost' size='sm' asChild className='-ml-3 w-fit'>
          <Link href='/tasks'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Tasks
          </Link>
        </Button>

        <div>
          <CardDescription>{task.id}</CardDescription>

          <CardTitle className='mt-2 text-4xl'>{task.title}</CardTitle>

          <div className='mt-4 flex flex-wrap gap-2'>
            <StatusBadge status={task.status} />

            <PriorityBadge priority={task.priority} />
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        <section>
          <h2 className='mb-3 text-lg font-semibold'>Description</h2>

          <p className='leading-8 text-muted-foreground'>{task.description}</p>
        </section>
        <div className='grid gap-4 md:grid-cols-3'>
          <DetailCardList items={cards} />
        </div>
      </CardContent>
    </Card>
  );
}

function DetailCardList({ items }: DetailCardListProps) {
  return (
    <>
      {items.map((item, idx) => (
        <Card key={idx}>
          <CardContent className='flex items-center gap-4 p-5'>
            {item.icon}

            <div>
              <p className='text-sm text-muted-foreground'>{item.title}</p>

              <p className='font-semibold'>{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

type TaskDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type TaskDetailContentProps = { id: string };

type DetailCardProps = {
  title: string;
  icon: React.ReactNode;
  value: string;
};

type DetailCardListProps = {
  items: DetailCardProps[];
}
