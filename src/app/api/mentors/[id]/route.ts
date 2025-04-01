import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

interface ApiError {
  error: string;
}

export async function GET(request: Request, context: any) {
  try {
    const cookieStore = cookies();

    // Get the mentor ID from the params safely
    const mentorId = context?.params?.id;
    if (!mentorId) {
      return NextResponse.json(
        { error: "Mentor ID is missing" },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: mentor, error } = await supabase
      .from("mentors")
      .select("*")
      .eq("id", mentorId)
      .single();

    if (error || !mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error in GET /api/mentors/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

