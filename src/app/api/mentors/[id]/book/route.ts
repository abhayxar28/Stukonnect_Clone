import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      
        const mentorId = params.id;
        const { email, name, country, profilePic, phoneNumber } = await req.json();

        // Check if mentor exists
        const { data: mentor, error: mentorError } = await supabase
            .from("mentors")
            .select("*")
            .eq("id", mentorId)
            .single();

        if (mentorError || !mentor) {
            return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
        }

        let { data: student, error: studentError } = await supabase
            .from("students")
            .select("*")
            .eq("email", email)
            .single();

        // If student doesn't exist, create a new one
        if (!student) {
            const { data: newStudent, error: createStudentError } = await supabase
                .from("students")
                .insert([{ email, name, country, profilePic, phone_number: phoneNumber }])
                .select()
                .single();

            if (createStudentError) {
                return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
            }
            student = newStudent;
        }

        // Create the booking
        const { data: booking, error: bookingError } = await supabase
            .from("bookings")
            .insert([{ mentor_id: mentorId, student_id: student.id, status: "pending" }])
            .select()
            .single();

        if (bookingError) {
            return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
        }

        return NextResponse.json({ message: "Booking successful", booking }, { status: 201 });

    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
