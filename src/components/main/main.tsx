import { gabarito } from "@/lib/fonts";
import EmptyButton from "../buttons/emptyButton";
import { TimelineComponent } from "@/components/ui/timelineComponent";
import { AccordionComponent } from "@/components/ui/shdcnComponents/AccordionComponent";
import { CarouselCard } from "@/components/ui/CarouselCard";
import ButtonComponent from "@/components/buttons/buttonComponent";
import MentorsCard from '@/components/MentorsCard';

export default function MainComponent() {
    return (
        <div className="flex flex-col text-[#101826] mt-15">
            <div className="flex justify-center items-center flex-col px-4 sm:px-8 md:px-16">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl leading-tight font-extrabold ${gabarito.className} text-center`}>
                    Get a <span className="text-[#ed7234] whitespace-nowrap">roadmap</span> to your <span className="text-[#ed7234] whitespace-nowrap">dream</span> university
                </h1>
                <div className="text-[16px] sm:text-[18px] text-gray-600 mt-6 sm:mt-8 font-medium">
                    <EmptyButton />
                </div>
                <div className="mt-8 sm:mt-10">
                    <ButtonComponent/>
                </div>
            </div>

            <div className="px-8 sm:px-10 flex justify-center items-center mt-10">
                <div className="bg-[#f5f5f5] p-3 rounded-xl border-gray-300">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <img
                            src="/image1.png"
                            alt="Landing page preview"
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-20 justify-center items-center h-full pb-3">
                <h1 className="text-4xl sm:text-5xl font-bold font-[Roboto] text-center">
                    Featured Mentors
                </h1>
                <div className="text-sm sm:text-base text-gray-600 pt-2 px-2">
                    <span>Learn from students who've successfully navigated their study abroad journey</span>
                </div>
                <div className="mt-8 sm:mt-10 w-full h-full">
                    <div className="flex animate-scroll gap-6 w-max h-max">
                        {[...Array(5)].map((_, i) => (
                            <MentorsCard key={i} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <TimelineComponent />
            </div>

            <div className="flex flex-col mt-25">
                <div className="flex flex-col justify-center items-center w-full">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center">
                        Stuff you might want to know 👇
                    </h1>
                    <div className="mt-20 w-full sm:w-[60%] md:w-[40%]">
                        <AccordionComponent />
                    </div>
                </div>
            </div>

            <div className="mt-20 sm:mt-30 flex justify-center items-center flex-col">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Dreaming of Your <span className="text-[#ed7234]">Dream University?</span> Let's Make It Happen!
                    </h1>
                </div>
                <div className="w-full flex justify-center flex-row mt-6 sm:mt-10">
                    <CarouselCard />
                </div>
                <div className="my-6 sm:my-10">
                    <ButtonComponent />
                </div>
            </div>
        </div>
    );
}
