export type Period = "daily" | "monthly";
export type Day = "today" | "yesterday" | "tomorrow";

export async function getHoroscope(
  sign: string,
  period: Period,
  day?: Day
) {
  const params = new URLSearchParams({ sign, period });
  if (period === "daily" && day) {
    params.append("day", day);
  }

  const res = await fetch(`/api/horoscope?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Kunde inte hämta horoskop");
  }
  const json = await res.json();

  return {
    text: json.data.horoscope_data as string,
    date: json.data.date as string, // redan i YYYY-MM-DD-format
  };
}
