import { createClient } from "@supabase/supabase-js";
import NextAuth from "next-auth";
import { authOptions } from "../../auth/authOptions";
import { NextRequest, NextResponse } from "next/server";

// Verify environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}


const handler = NextAuth(authOptions);

export async function GET(req: NextRequest) {
  return handler(req, new NextResponse());
}

export async function POST(req: NextRequest) {
  return handler(req, new NextResponse());
}

