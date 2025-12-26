import { sql } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const r = await sql`select * from prices order by fetched_at desc limit 100;`;

  return (
    <div style={{ padding: 20 }}>
      <h1>Competitor Pricing</h1>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Row</th><th>Competitor</th><th>Price</th>
            <th>Shipping</th><th>Tax</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {r.rows.map((x:any,i:number)=>(
            <tr key={i}>
              <td>{x.row_index+1}</td>
              <td>{x.competitor_key}</td>
              <td>${x.price}</td>
              <td>{x.shipping_flag}</td>
              <td>${x.tax_amount}</td>
              <td>${x.true_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
