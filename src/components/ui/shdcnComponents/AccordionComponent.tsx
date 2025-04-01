import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionComponent() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-2 py-4 px-6 sm:px-8 rounded-xl shadow-[0_4px_10px_#ed7234]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg sm:text-xl font-semibold">
          What can a student help me with that a counsellor can't?
        </AccordionTrigger>
        <AccordionContent className="text-sm sm:text-base">
          Simple answer?{" "}
          <span className="font-bold text-black">
            No one knows what it feels like better than a student who has been
            through it themselves.
          </span>
          <br />
          <br />
          We've been through it ourselves, and we know exactly what it's like.
          From personal experience, our best mentors have always been those
          just a couple of steps ahead—they're far enough along to share their
          successes and what they would have done differently, but not so far
          removed that they've forgotten the real struggles of getting there.
          <br />
          <br />
          A student who has achieved what you're trying to achieve is much
          better suited to guide you—not just on the steps to take, but even on
          which counsellor to use, what opportunities exist after studying, and
          what it's actually like to live there.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg sm:text-xl font-semibold">
          How long is each session?
        </AccordionTrigger>
        <AccordionContent className="text-sm sm:text-base">
          Each session lasts{" "}
          <span className="font-semibold text-black">30 minutes.</span>
          <br />
          <br />
          During our research, we conducted free calls with students, testing
          different session lengths (15, 30, and 60 minutes). We found that 15
          minutes felt short, while 1 hour was often more time than needed since
          most students came prepared with questions. Our calls naturally lasted
          around 25 minutes, so adding a small buffer made 30 minutes the sweet
          spot—long enough for a meaningful discussion without wasting time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg sm:text-xl font-semibold">
          How do I make the best use of my sessions?
        </AccordionTrigger>
        <AccordionContent className="text-sm sm:text-base">
          Two simple tips:
          <br />
          1.{" "}
          <span className="font-bold text-black">Come prepared:</span> Note down
          your key questions in advance so you can make the best use of your
          time.
          <br />
          2. <span className="font-bold text-black">Leave a note</span> for your
          mentor when booking through their Calendly link. This helps them
          understand what you need and come ready with the best advice.
          <br />
          <br />
          We also encourage parents to join the session! We know your mom wants
          to know what their bachha is going to eat, where they'll live, and all
          those important details. These are valid concerns, and who better to
          answer them than someone who has just been through it themselves?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-lg sm:text-xl font-semibold">
          Actually, I have another question?
        </AccordionTrigger>
        <AccordionContent className="text-sm sm:text-base">
          Sweet, send it to{" "}
          <span className="font-bold text-black">founders@stukonnet.com!</span> 📩
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
