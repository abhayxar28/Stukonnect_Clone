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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Await cookies() here
    const cookieStore = cookies();
    
    // Await params.id here as well
    const { id } = (await params);
    // Use supabase client with the awaited cookies
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: mentor, error } = await supabase
      .from("mentors")
      .select("*")
      .eq("id", id)  // Use the awaited params.id here
      .single();

    if (error) {
      return NextResponse.json<ApiError>(
        { error: "Failed to fetch mentor" },
        { status: 500 }
      );
    }

    if (!mentor) {
      return NextResponse.json<ApiError>(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<MentorResponse>(mentor);
  } catch (error) {
    console.error("Error in GET /api/mentors/[id]:", error);
    return NextResponse.json<ApiError>(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
