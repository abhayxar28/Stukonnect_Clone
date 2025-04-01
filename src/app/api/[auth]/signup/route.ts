import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, phoneNumber } = body;

        if (!email || !password || !name || !phoneNumber) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        // Check if admin already exists
        const { data: existingAdmins, error: fetchError } = await supabase
            .from("admin")
            .select("*")
            .eq("email", email); // ✅ Changed from `username` to `email`

        if (fetchError) {
            console.error("Error fetching admin:", fetchError.message);
            return NextResponse.json({ error: "Database error while checking admin" }, { status: 500 });
        }

        if (existingAdmins && existingAdmins.length > 0) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
        }

        // Insert new admin
        const { error: insertError } = await supabase
            .from("admin")
            .insert([{ email, password, name, phone_number: phoneNumber }]); 

        if (insertError) {
            console.error("Error inserting admin:", insertError.message);
            return NextResponse.json({ error: "Database error while creating admin" }, { status: 500 });
        }

        return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
