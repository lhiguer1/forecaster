import type { Metadata } from "next";
import { getForecast } from "@/lib/forecast";

export async function generateMetadata(): Promise<Metadata> {
  let forecastObj = await getForecast();
  return forecastObj === undefined
    ? {}
    : {
        title: `${forecastObj.location.name} | Forecaster`,
        description: `${forecastObj.location.name} Forecast`,
      };
}

export default async function Home() {
  let forecastObj = await getForecast();

  if (forecastObj === undefined) {
    throw new Error("Failed to fetch forecast");
  }
  let { location, forecast } = forecastObj;

  return (
    <main className="prose">
      <h2>{location.name}</h2>
      <table className="table-fixed text-center">
        <thead>
          <tr>
            <th>Date</th>
            <th>Low</th>
            <th>Average</th>
            <th>Max</th>
            <th>Sunrise</th>
            <th>Sunset</th>
          </tr>
        </thead>
        <tbody>
          {forecast.forecastday.map(({ date, day, astro }, index) => (
            <tr key={index}>
              <td>{date}</td>
              <td>{day.mintemp_f}</td>
              <td>{day.avgtemp_f}</td>
              <td>{day.maxtemp_f}</td>
              <td>{astro.sunrise}</td>
              <td>{astro.sunset}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
