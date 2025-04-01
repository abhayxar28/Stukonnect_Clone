"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Mentor {
  id: string;
  name: string;
  country: string;
  profilepic: string;
  price: number;
  about: {
    tags: string[];
    description: string[];
    academicAchievements: string[];
    hobbies: string[];
    dayavailable: string[];
    timeslot: string[];
    universitydetails: Array<{
      universitylogo: string;
      universityName: string;
      scholarshipName: string;
      scholarshipPercent: string;
      aboutScholarship: string;
      courseName: string;
    }>;
    experience: Array<{
      title: string;
      organization: string;
      duration: string;
      description: string;
    }>;
  };
}

interface FetchError {
  message: string;
}

export default function MentorsCard() {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/api/mentors");
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Failed to fetch mentors");

        setMentors(data.mentors);
      } catch (error) {
        const fetchError = error as FetchError;
        console.error("Error fetching mentors:", fetchError.message);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="flex gap-6">
      {mentors.map((mentor) => (
        <Link key={mentor.id} href={`/mentors/${mentor.id}`} className="block w-[250px]">
          <div className="bg-white p-4 shadow-xl rounded-lg flex flex-col items-center text-center justify-center cursor-pointer hover:shadow-orange-500 hover:scale-105 transition-transform duration-300 h-[450px]">
            <div className="relative w-40 h-40 rounded-xl overflow-hidden">
              <Image
                src={mentor.profilepic}
                alt={mentor.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="text-lg font-semibold mt-4">{mentor.name}</h2>

            {mentor.about?.universitydetails?.length ? (
              mentor.about.universitydetails.map((university, index) => (
                <div key={index} className="mt-2 flex justify-center items-center flex-col w-full">
                  {university.universitylogo && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={university.universitylogo}
                        alt="University Logo"
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  {university.universityName && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{university.universityName}</p>
                  )}
                  {university.scholarshipName && (
                    <div className="flex flex-wrap gap-1 mt-4 mb-2 justify-center">
                      <span className="px-2 py-1 text-xs bg-gray-200 rounded-xl">
                        {university.scholarshipName}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 mt-2">No university details available</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
