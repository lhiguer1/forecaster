import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  const url = new URL("https://api.weatherapi.com/v1/forecast.json");
  // Location is hardcoded for now

  if (q) url.searchParams.set("q", q);
  url.searchParams.set("days", "5");
  url.searchParams.set("key", process.env.WEATHER_API_KEY!);

  const res = await fetch(url);

  return Response.json(await res.json(), {
    status: res.status,
  });
}
