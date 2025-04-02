import { Timeline } from "@/components/ui/timeline";

export function TimelineComponent() {
  const data = [
    {
      title: "What we are Building",
      content: (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="xl:w-[850px] lg:w-[700px] md:w-[600px] sm:w-[500px] h-[300px] sm:h-[600px] border border-[#f5f5f5] rounded-2xl p-4 ">
              <video
                src="/videoplayback.mp4"
                className="w-full h-full object-cover rounded-2xl"
                autoPlay
                muted
                loop
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: `What's our Goals ?`,
      content: (
        <div>
          <p className="dark:text-neutral-200 text-md sm:text-sm font-normal mb-8 text-gray-600">
            To bridge the gap between aspiring students and those already
            studying abroad, providing guidance, mentorship, and real insights
            for a smoother journey. 🌍🎓
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="xl:w-[850px] lg:w-[700px] md:w-[600px] sm:w-[500px] h-[300px] sm:h-[600px] border-2 border-[#f5f5f5] rounded-2xl p-4">
              <video
                src="/videoplayback1.mp4"
                className="w-full h-full object-cover rounded-2xl"
                autoPlay
                muted
                loop
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Our Journey till now",
      content: (
        <div>
          <p className="text-gray-600 dark:text-neutral-200 text-md sm:text-sm font-normal mb-4">
            From aspiring students to passionate founders, we've walked the
            path of studying abroad. Now, we're building a platform to help
            others do the same—connecting dreams with real experiences. 🚀🌍
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
              <img
                src="/img3.png"
                alt="Hero template"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
              <img
                src="/img4.png"
                alt="Feature template"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
