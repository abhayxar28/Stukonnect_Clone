import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, country, profilepic, price, about } = body;

    if (!email || !password || !name || !country || !profilepic || !about || !price) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }


    const { data, error } = await supabase
      .from("mentors")
      .insert([
        {
          email,
          password,
          name,
          country,
          profilepic,
          price,
          about,
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "Mentor added successfully!", mentor: data }, { status: 201 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong." }, { status: 500 });
  }
}


export async function GET() {
  try {
    const { data: mentors, error } = await supabase.from("mentors").select("*");

    if (error) throw new Error(error.message);

    return NextResponse.json({ mentors }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong." }, { status: 500 });
  }
}