import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import TaskForm from '@/components/TaskForm';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Task',
};

export default function NewTaskPage() {
  return (
    <Card className='mx-auto max-w-2xl py-8'>
      <CardHeader className='space-y-6'>
        <Button variant='ghost' size='sm' asChild className='-ml-3 w-fit'>
          <Link href='/tasks'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Tasks
          </Link>
        </Button>

        <div>
          <CardTitle className='text-3xl'>Create New Task</CardTitle>
          <CardDescription className='mt-2'>Fill in the information below to create a new task.</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <TaskForm />
      </CardContent>
    </Card>
  );
}
