import { ClipboardList } from 'lucide-react';
import { Card, CardContent } from '../card';

export default function EmptyTask() {
  return (
    <Card className='mt-6'>
      <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
        <ClipboardList className='mb-4 size-12 text-muted-foreground' />

        <h3 className='text-lg font-semibold'>No tasks found</h3>

        <p className='mt-2 text-sm text-muted-foreground'>There are no tasks matching your current filters.</p>
      </CardContent>
    </Card>
  );
}
