export default function MentorCardSkeleton() {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center text-center justify-center">
      {/* Profile Image Skeleton */}
      <div className="w-40 h-40 bg-gray-200 rounded-xl animate-pulse" />
      
      {/* Name Skeleton */}
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mt-2" />
      
      {/* University Details Skeleton */}
      <div className="mt-2 flex justify-center items-center flex-col w-full">
        
        {/* University Logo Skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mt-2" />
        
        {/* University Name Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        
        {/* Scholarship Badge Skeleton */}
        <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse mt-2" />
      </div>
    </div>
  );
} 