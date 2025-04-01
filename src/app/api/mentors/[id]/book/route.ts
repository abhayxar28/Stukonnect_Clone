import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: BookingRequest = await request.json();
    const { studentId, date, time } = body;
    const mentorId = params.id;

    // Check if student exists
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single();

    if (studentError) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Check if mentor exists
    const { data: mentor, error: mentorError } = await supabase
      .from("mentors")
      .select("*")
      .eq("id", mentorId)
      .single();

    if (mentorError) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          student_id: studentId,
          mentor_id: mentorId,
          date,
          time,
          status: "pending",
        },
      ])
      .select();

    if (bookingError) {
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    return NextResponse.json(booking[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
