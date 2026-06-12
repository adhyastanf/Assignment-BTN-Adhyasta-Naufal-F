import TaskCard from '@/components/TaskCard';
import TaskFilter from '@/components/TaskFilter';
import TaskSearch from '@/components/TaskSearch';
import TaskSort from '@/components/TaskSort';
import TaskSummary from '@/components/TaskSummary';
import { Button } from '@/components/ui/button';
import EmptyTask from '@/components/ui/EmptyState/EmptyTask';
import DashboardSkeleton from '@/components/ui/LoadingState/DashboardSkeleton';
import { fetchTasks } from '@/services/tasks';
import { Task } from '@/types/task';
import { filterTasks, sortTasks } from '@/utils/task-utils';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getTasks() {
  const data = await fetchTasks();
  return data;
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const params = await searchParams;

  const search = params.search ?? '';
  const status = params.status ?? 'All';
  const sort = params.sort ?? '';

  const suspenseKey = `${search}-${status}-${sort}`;

  return (
    <main>
      <header className='pb-4 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Task Management Dashboard NICE TRY GAGAL HEHEHE</h1>
        </div>

        <Button asChild>
          <Link href='/tasks/new'>
            <Plus />
            New Task
          </Link>
        </Button>
      </header>

      <Suspense key={suspenseKey} fallback={<DashboardSkeleton />}>
        <TaskCompnent search={search} status={status} sort={sort} />
      </Suspense>
    </main>
  );
}

async function TaskCompnent({ search, status, sort }: TaskComponentProps) {
  const tasksData: Task[] = await getTasks();

  const filterTask = filterTasks(tasksData, search, status);

  const displayedTasks = sortTasks(filterTask, sort);

  return (
    <>
      <TaskSummary tasks={displayedTasks} />

      <div className='mt-6 flex gap-4'>
        <TaskSearch />
        <TaskFilter />
        <TaskSort />
      </div>

      <ListCard tasks={displayedTasks} />
    </>
  );
}

function ListCard({ tasks }: ListCardProps) {
  if (tasks.length === 0) {
    return <EmptyTask />;
  }

  return (
    <div className='mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

type TaskPageSearchParams = {
  search?: string;
  status?: string;
  sort?: string;
};

type TaskComponentProps = {
  search: string;
  status: string;
  sort: string;
};

type TasksPageProps = {
  searchParams: Promise<TaskPageSearchParams>;
};

type ListCardProps = {
  tasks: Task[];
};
