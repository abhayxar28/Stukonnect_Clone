"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MentorProfileSkeleton from "@/components/skeleton/MentorProfileSkeleton";
import Image from "next/image";

interface Mentor {
  id: string;
  name: string;
  email: string;
  universityName: string;
  universityLogo?: string;
  scholarshipName?: string;
  country: string;
  price: number;
  profilepic?: string;
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
    price?: number;
  } | null;
}

interface FetchError {
  message: string;
}

interface MentorProfileProps {
  mentor: {
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
  };
}

const MentorProfile = ({ mentor }: MentorProfileProps) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [mentorData, setMentorData] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMentor = async () => {
      try {
        const res = await fetch(`/api/mentors/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch mentor.");
        }

        setMentorData(data);
      } catch (error) {
        const fetchError = error as FetchError;
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading) return <MentorProfileSkeleton />;
  if (error) return <p className="text-center text-red-500 mt-10">❌ {error}</p>;
  if (!mentorData) return null;

  const aboutData = mentorData.about;

  const expertiseAreas = [
    "Scholarship Applications",
    "College Essays",
    "STEM Applications",
    "Interview Prep",
    "Financial Aid"
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-8">
      {/* Left Column - Profile Info */}
      <div className="col-span-2">
        <div className="flex gap-6">
          <div className="relative w-48 h-48">
            <Image
              src={mentorData.profilepic}
              alt={mentorData.name}
              fill
              className="rounded-lg object-cover bg-gray-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{mentorData.name}</h1>
            <p className="text-gray-600 mt-1">Junior at {aboutData?.universitydetails[0].universityName}</p>
            <p className="text-gray-600">Studying {aboutData?.universitydetails[0].courseName || "Computer Science"}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="mx-1">🎖</span>
              <span className="text-gray-600">{mentorData.scholarshipName || "Gates Millennium Scholarship"} Recipient</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {expertiseAreas.map((area, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 font-bold"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

      {/* About Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About {mentorData.name.split(" ")[0]}</h2>
          <div className="space-y-4 text-gray-600">
            <p>{aboutData?.description?.[0] || `Hey there! I'm ${mentorData.name.split(" ")[0]}, a junior at ${mentorData.universityName} studying Computer Science with a minor in Education. I was fortunate to receive the Gates Scholarship which covers my full tuition and expenses.`}</p>
            
            <p>I remember how overwhelming the college application process was, especially as a first-generation college student from a public high school. I spent countless hours researching scholarships, perfecting my essays, and preparing for interviews.</p>
            
            <p>Now, I'm passionate about helping other students navigate this process. I've helped 20+ students secure scholarships ranging from $5,000 to full rides. My mentees have been accepted to schools like Stanford, MIT, Harvard, and UC Berkeley.</p>
            
            <p>My approach focuses on finding your authentic voice and unique strengths. I believe everyone has a compelling story to tell – my job is to help you tell it in a way that resonates with admissions officers and scholarship committees.</p>
          </div>
        </div>

        {/* Scholarship Journey */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">My Scholarship Journey</h2>
          <div className="bg-gray-100 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Gates Millennium Scholarship</h3>
                <p className="text-gray-600">Full Ride</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              The Gates Millennium Scholars Program selects 1,000 talented students each year to receive a good-through-graduation scholarship to use at any college or university of their choice.
            </p>
            <p className="mt-2 text-gray-500">Awarded in 2021</p>
          </div>
        </div>

        {/* Academic Achievements */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Academic Achievements</h2>
          <div className="bg-white rounded-lg p-6 border">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>3.95 GPA</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Dean's List (All Semesters)</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Undergraduate Research Assistant - AI Lab</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Published Paper in Undergraduate Research Journal</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>President, First-Generation Student Association</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="bg-white rounded-lg p-6 border">
            <ul className="space-y-6">
              {aboutData?.experience?.map((exp, index) => (
                <li key={index}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-full mt-1">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-gray-600 text-sm">{exp.organization} • {exp.duration}</p>
                      <p className="mt-2 text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      </div>

        {/* Hobbies & Interests */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Hobbies & Interests</h2>
          <div className="flex flex-wrap gap-2">
            {["Competitive Programming", "Hiking", "Playing Piano", "Volunteer Tutoring"].map((hobby) => (
              <span key={hobby} className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Availability</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-4">Days Available</h3>
              <div className="flex flex-wrap gap-2">
                {["Monday", "Wednesday", "Saturday"].map((day) => (
                  <span key={day} className="px-4 py-2 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-4">Time Slots</h3>
              <div className="space-y-2">
                {["4:00 PM - 6:00 PM", "7:00 PM - 9:00 PM"].map((slot) => (
                  <div key={slot} className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{slot}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Booking Section */}
      <div className="col-span-1">
        <div className="bg-white rounded-lg border p-6 sticky top-6">
          <h2 className="text-2xl font-bold mb-2">Book a Session</h2>
          <p className="text-gray-600 mb-6">
            Get guidance from {mentorData.name.split(" ")[0]} on your college and scholarship applications
          </p>

          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium">Session Rate</span>
            <span className="text-2xl font-bold">
            ₹{mentorData.price.toString()}/-
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-semibold">What's included:</h3>
            <div className="space-y-2">
              {[
                "Personalized guidance on scholarship applications",
                "Essay review and feedback",
                "Application strategy tailored to your strengths"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Sessions conducted via video call</span>
          </div>

          <button 
            onClick={() => router.push(`/mentors/${id}/book`)}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 cursor-pointer"
          >
            Book a Session
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            You won't be charged until after the session is confirmed
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className="font-semibold">{mentorData.universityName || "Stanford"}</div>
                <div className="text-sm text-gray-500">University</div>
              </div>
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <div className="font-semibold">2021</div>
                <div className="text-sm text-gray-500">Scholarship Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
