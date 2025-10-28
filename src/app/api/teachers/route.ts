import { NextResponse } from "next/server";
import { getAppointmentTypes } from "@/lib/acuity";

export const dynamic = "force-dynamic";

export async function GET() {
  // If “teachers” was a placeholder, return types or adjust as needed.
  const types = await getAppointmentTypes();
  return NextResponse.json(types);
}