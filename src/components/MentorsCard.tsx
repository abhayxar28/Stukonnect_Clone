"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Mentor {
  id: string;
  name: string;
  email: string;
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
    experience: {
      title: string;
      organization: string;
      duration: string;
      description: string;
    }[];
    universitydetails: {
      universitylogo: string;
      universityName: string;
      scholarshipName: string;
      scholarshipPercent: string;
      aboutScholarship: string;
      courseName: string;
    }[];
  } | null;
}

export default function MentorsCard() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/api/mentors");
        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }
        const data = await response.json();
        setMentors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch mentors");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-[250px] h-[450px] bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {mentors.map((mentor) => (
        <Link key={mentor.id} href={`/mentors/${mentor.id}`} className="block w-[250px]">
          <div className="bg-white p-4 shadow-xl rounded-lg flex flex-col items-center text-center justify-center cursor-pointer hover:shadow-orange-500 hover:scale-105 transition-transform duration-300 h-[450px]">
            <div className="relative w-40 h-40 rounded-xl overflow-hidden">
              <img
                src={mentor.profilepic}
                alt={mentor.name}
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
                      <img
                        src={university.universitylogo}
                        alt="University Logo"
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{university.universityName}</p>
                  <p className="text-sm text-gray-600">{university.scholarshipName}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600 mt-2">No university details available</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {mentor.about?.tags?.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 text-lg font-bold text-orange-500">
              ₹{mentor.price}/-
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
