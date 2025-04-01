export default function BookingPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Booking Form */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg border p-6">
            {/* Mentor Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Email Field */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Phone Field */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Date Field */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Time Slot Field */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Message Field */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
            
            {/* Price Summary */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 