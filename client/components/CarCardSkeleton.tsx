import { Skeleton } from "@/components/ui/skeleton";

export function CarCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative">
        <Skeleton className="aspect-[4/3] w-full" />
        
        {/* Badge Skeletons */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        
        {/* Heart Icon Skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <div className="mb-3">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Price */}
        <div className="mb-4">
          <Skeleton className="h-7 w-1/3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div>
            <Skeleton className="h-4 w-10 mb-1" />
            <Skeleton className="h-4 w-14" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div>
            <Skeleton className="h-4 w-14 mb-1" />
            <Skeleton className="h-4 w-18" />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <Skeleton className="h-4 w-4 mr-2 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CarCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <CarCardSkeleton key={index} />
      ))}
    </div>
  );
}