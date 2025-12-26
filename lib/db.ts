import { sql } from "@vercel/postgres";
export { sql };

export async function createRun() {
  const r = await sql`insert into runs (status) values ('RUNNING') returning id;`;
  return r.rows[0].id;
}

export async function finishRun(id: number) {
  await sql`update runs set status='OK', finished_at=now() where id=${id};`;
}
