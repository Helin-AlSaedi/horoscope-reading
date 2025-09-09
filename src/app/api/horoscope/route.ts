import { NextResponse } from "next/server";

const BASE_URL = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sign = searchParams.get("sign");
  const period = searchParams.get("period"); // daily eller monthly
  const day = searchParams.get("day");       // används bara för daily

  if (!sign || !period) {
    return NextResponse.json(
      { error: "Missing sign or period" },
      { status: 400 }
    );
  }

  let url = `${BASE_URL}/${period}?sign=${sign}`;
  if (period === "daily" && day) {
    url += `&day=${day}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from horoscope API" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // formatera datumet om det finns
    if (data.data.date) {
      data.data.date = new Date(data.data.date)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
