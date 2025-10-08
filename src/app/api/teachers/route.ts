import { NextResponse } from "next/server";
import { getAppointmentTypes } from "@/lib/acuity";

export async function GET() {
  const lessons = await getAppointmentTypes();
  return NextResponse.json(lessons);
}
