import path from "path";
import { readMapping } from "../../../lib/readMapping";
import { fetchHtml } from "../../../lib/fetchHtml";
import { parseAny } from "../../../lib/parsers";
import { createRun, finishRun, sql } from "../../../lib/db";
import { TX_TAX, round2 } from "../../../lib/tax";

export async function GET() {
  const runId = await createRun();
  const rows = readMapping(path.join(process.cwd(), "data/competitors.xlsx"));

  for (let i = 0; i < rows.length; i++) {
    for (const key of Object.keys(rows[i])) {
      const url = rows[i][key];
      if (!url.startsWith("http")) continue;

      try {
        const html = await fetchHtml(url);
        const parsed = parseAny(html);
        const tax = parsed.price ? round2(parsed.price * TX_TAX) : null;
        const total = parsed.price ? round2(parsed.price + tax!) : null;

        await sql`
          insert into prices
          (run_id,row_index,competitor_key,url,price,shipping_flag,tax_amount,true_total,min_total)
          values
          (${runId},${i},${key},${url},${parsed.price},${parsed.shipping_flag},${tax},${total},${total})
        `;
      } catch (e: any) {
        await sql`
          insert into prices (run_id,row_index,competitor_key,url,notes)
          values (${runId},${i},${key},${url},${e.message})
        `;
      }
    }
  }

  await finishRun(runId);
  return Response.json({ runId });
}
