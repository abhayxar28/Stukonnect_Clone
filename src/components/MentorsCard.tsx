"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Mentor {
  id: string;
  name: string;
  email: string;
  country: string;
  profilepic: string;
  price: number | string;
  about: {
    tags: string[];
    description: string[];
    universitydetails: {
      universitylogo: string;
      scholarshipName: string;
      universityName: string;
    }[];
  };
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
      } catch (error: any) {
        console.error("Error fetching mentors:", error.message);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="flex gap-6">
      {mentors.map((mentor) => (
        <Link key={mentor.id} href={`/mentors/${mentor.id}`} className="block w-[250px]">
          <div className="bg-white p-4 shadow-xl rounded-lg flex flex-col items-center text-center justify-center cursor-pointer hover:shadow-orange-500 hover:scale-105 transition-transform duration-300 h-[450px]">
            <div className="w-40 h-40 rounded-xl overflow-hidden">
              <img
                src={mentor.profilepic}
                alt={mentor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold mt-4">{mentor.name}</h2>

            {mentor.about?.universitydetails?.length ? (
              mentor.about.universitydetails.map((university, index) => (
                <div key={index} className="mt-2 flex justify-center items-center flex-col w-full">
                  {university.universitylogo && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={university.universitylogo}
                        alt="University Logo"
                        className="w-full h-full object-cover"
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
