export default function MentorProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-8">
      {/* Left Column - Profile Info */}
      <div className="col-span-2">
        <div className="flex gap-6">
          {/* Profile Image Skeleton */}
          <div className="w-48 h-48 rounded-lg bg-gray-200 animate-pulse" />
          
          <div className="flex-1">
            {/* Name Skeleton */}
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
            {/* University Skeleton */}
            <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
            
            {/* Scholarship Badge Skeleton */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Expertise Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* About Section Skeleton */}
        <div className="mt-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Scholarship Journey Skeleton */}
        <div className="mt-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="bg-gray-100 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Academic Achievements Skeleton */}
        <div className="mt-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="bg-white rounded-lg p-6 border">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Skeleton */}
        <div className="mt-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="bg-white rounded-lg p-6 border">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies & Interests Skeleton */}
        <div className="mt-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Availability Skeleton */}
        <div className="mt-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Booking Section Skeleton */}
      <div className="col-span-1">
        <div className="bg-white rounded-lg border p-6 sticky top-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-6" />

          <div className="flex justify-between items-center mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="space-y-4 mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />

          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-4" />

          <div className="mt-8">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse mx-auto mb-2" />
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mx-auto" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 