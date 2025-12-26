import * as cheerio from "cheerio";

export function parsePrice(html: string): number | null {
  const $ = cheerio.load(html);
  const text = $("body").text();
  const m = text.replace(/,/g, "").match(/\$([0-9]+(\.[0-9]{2})?)/);
  return m ? Number(m[1]) : null;
}
