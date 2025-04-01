import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface MentorResponse {
  id: string;
  email: string;
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

interface ApiError {
  message: string;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("mentors")
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as MentorResponse[]);
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(
      { error: apiError.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("mentors")
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as MentorResponse[]);
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(
      { error: apiError.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}