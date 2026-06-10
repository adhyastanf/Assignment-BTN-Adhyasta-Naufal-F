import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex min-h-[80vh] items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardContent className='flex flex-col items-center py-10 text-center'>
          <TriangleAlert className='mb-4 size-12 text-muted-foreground' />

          <h1 className='text-6xl font-bold tracking-tight'>404</h1>

          <h2 className='mt-2 text-xl font-semibold'>Page Not Found</h2>

          <p className='mt-2 text-sm text-muted-foreground'>The page you are looking for does not exist or may have been moved.</p>

          <Button asChild className='mt-6'>
            <Link href='/tasks'>Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
