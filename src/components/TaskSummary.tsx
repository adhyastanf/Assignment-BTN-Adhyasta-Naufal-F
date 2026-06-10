import { cn } from '@/lib/utils';
import { Task } from '@/types/task';
import { CheckCircle2, CircleDashed, ClipboardList, Clock3, LucideIcon, XCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

type TaskSummaryProps = {
  tasks: Task[];
};

export default function TaskSummary({ tasks }: TaskSummaryProps) {
  const pending = tasks.filter((task) => task.status === 'Pending').length;

  const inProgress = tasks.filter((task) => task.status === 'In Progress').length;

  const completed = tasks.filter((task) => task.status === 'Completed').length;

  const rejected = tasks.filter((task) => task.status === 'Rejected').length;

  const summaryItems: SummaryItem[] = [
    {
      title: 'Total Tasks',
      value: tasks.length,
      icon: ClipboardList,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      title: 'Pending',
      value: pending,
      icon: Clock3,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      title: 'In Progress',
      value: inProgress,
      icon: CircleDashed,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      title: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    {
      title: 'Rejected',
      value: rejected,
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-5'>
      {summaryItems.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className='transition-shadow hover:shadow-md'>
            <CardContent className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>{item.title}</p>

                <p className='mt-2 text-3xl font-bold'>{item.value}</p>
              </div>

              <div className={cn(item.bg, 'rounded-xl p-3')}>
                <Icon className={cn('h-6 w-6', item.color)} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

type SummaryItem = {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
};
