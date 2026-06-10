import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-24 w-full rounded-xl' />
        ))}
      </div>

      <div className='mt-6 flex gap-4'>
        <Skeleton className='h-10 flex-1' />
        <Skeleton className='h-10 w-40' />
        <Skeleton className='h-10 w-40' />
      </div>

      <div className='mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='space-y-3 rounded-lg border p-5'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />

            <div className='flex justify-between pt-4'>
              <Skeleton className='h-8 w-20' />
              <Skeleton className='h-8 w-16' />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
