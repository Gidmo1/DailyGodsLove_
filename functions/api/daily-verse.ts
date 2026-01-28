import verse from "../../shared/data/daily-verse.json";

export const onRequestGet: PagesFunction = async () => {
  // Always return the verse for now (John 3:16)
  return new Response(JSON.stringify(verse), {
    headers: { "Content-Type": "application/json" },
  });
};
