import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const  id  = (await params).id;

    if (!id) {
      return NextResponse.json({ error: "Mentor ID is required." }, { status: 400 });
    }

    const { data, error } = await supabase.from("mentors").select("*").eq("id", id).single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Mentor not found." }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong." }, { status: 500 });
  }
}
