"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import useSWR, { Fetcher } from "swr";

export default function Home() {
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const {
    data: localForecast,
    error,
    isLoading = false,
  } = useSWR<ForecastObject, Error>(
    coords ? `/api/forecast?q=${coords.latitude},${coords.longitude}` : null,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(((await res.json()) as WeatherAPIError).error.message);
      }
      return res.json();
    }
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setCoords(coords);
      });
    }
  }, []);

  if (error) throw error;
  if (!coords || isLoading) return <Loading />;

  return (
    <main>
      <h2>{localForecast?.location.name}</h2>
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
          {localForecast?.forecast.forecastday.map(
            ({ date, day, astro }, index) => (
              <tr key={index}>
                <td>{date}</td>
                <td>{day.mintemp_f}</td>
                <td>{day.avgtemp_f}</td>
                <td>{day.maxtemp_f}</td>
                <td>{astro.sunrise}</td>
                <td>{astro.sunset}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}
