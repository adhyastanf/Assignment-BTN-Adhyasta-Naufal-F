import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DetailSkeleton() {
  return (
    <main className="mx-auto max-w-4xl py-8">
      <Card>
        <CardHeader className="space-y-6">
          {/* Back Button */}
          <Skeleton className="h-9 w-32" />

          <div>
            {/* ID */}
            <Skeleton className="h-4 w-24" />

            {/* Title */}
            <Skeleton className="mt-3 h-10 w-2/3" />

            {/* Badges */}
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <section>
            <Skeleton className="mb-4 h-6 w-32" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </section>

          {/* Info Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="flex items-center gap-4 p-5">
                  <Skeleton className="size-5 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}