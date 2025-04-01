import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface BookingRequest {
  studentId: string;
  mentorId: string;
  date: string;
  time: string;
}

interface Student {
  id: string;
  email: string;
  name: string;
  country: string;
  profilePic: string;
  phone_number: string;
}

interface Mentor {
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

export async function POST(request: NextRequest, context: any): Promise<NextResponse> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = (await request.json()) as BookingRequest;

    // Get the mentor ID from the params safely
    const mentorId = context?.params?.id;
    if (!mentorId) {
      return NextResponse.json({ error: "Mentor ID is missing" }, { status: 400 });
    }

    // Get the mentor details
    const { data: mentor, error: mentorError } = await supabase
      .from("mentors")
      .select("*")
      .eq("id", mentorId)
      .single();

    if (mentorError || !mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    // Get the student details
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("id", body.studentId)
      .single();

    if (studentError || !student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Create the booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          student_id: body.studentId,
          mentor_id: mentorId,
          date: body.date,
          time: body.time,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (bookingError) {
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error in POST /api/mentors/[id]/book:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
