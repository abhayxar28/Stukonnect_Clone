import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Mentor } from "@/types";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("mentors")
      .select("*");

    if (error) throw error;

    return NextResponse.json(data as Mentor[]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch mentors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("mentors")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0] as Mentor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create mentor" }, { status: 500 });
  }
}