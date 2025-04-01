
"use client";

import Carousel from "@/components/ui/carousel";
export function CarouselCard() {
  const slideData = [
    {
      src: "/card-stack/image1.jpg",
    },
    {
      src: "/card-stack/image2.jpg",
    },
    {
      src: "/card-stack/image3.jpg",
    },
    {
      src: "/card-stack/image4.jpg",
    },
    {
      src: "/card-stack/image5.jpg",
    },
    {
      src: "/card-stack/image6.jpg",
    },
    {
      src: "/card-stack/image7.jpg",
    },
    {
      src: "/card-stack/image8.jpg",
    },
    {
      src: "/card-stack/image9.jpg",
    },
    {
      src: "/card-stack/image10.jpg",
    },
    {
      src: "/card-stack/image11.jpg",
    },
    {
      src: "/card-stack/image12.jpg",
    },
    {
      src: "/card-stack/image13.jpg",
    },

  ];
  return (
    <div className="relative overflow-hidden w-[80%] h-full pt-10 pb-15">
      <Carousel slides={slideData} />
    </div>
  );
}
