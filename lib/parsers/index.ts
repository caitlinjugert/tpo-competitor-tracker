import { parsePrice } from "./common";

export function parseAny(html: string) {
  return {
    price: parsePrice(html),
    shipping_flag: html.toLowerCase().includes("free shipping") ? "FREE" : "UNKNOWN"
  };
}
