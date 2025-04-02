import NextAuth from "next-auth";
import { authOptions } from "../authOptions";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth(authOptions);

export async function GET(req: NextRequest) {
  return handler(req, new NextResponse());
}

export async function POST(req: NextRequest) {
  return handler(req, new NextResponse());
} 