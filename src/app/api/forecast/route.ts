export async function GET() {
  const url = new URL("https://api.weatherapi.com/v1/forecast.json");
  // Location is hardcoded for now
  url.searchParams.set("q", "Phoenix");
  url.searchParams.set("days", "5");
  url.searchParams.set("key", process.env.WEATHER_API_KEY!);

  const res = await fetch(url);

  if (!res.ok) {
    return Response.json(await res.json());
  }

  const data: ForecastObject = await res.json();

  return Response.json(data);
}
