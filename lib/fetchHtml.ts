export async function fetchHtml(url: string) {
  const res = await fetch(url, {
    headers: { "user-agent": "TPO-Price-Tracker" }
  });
  return res.text();
}
