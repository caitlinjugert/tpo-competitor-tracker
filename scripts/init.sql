create table if not exists runs (
  id bigserial primary key,
  started_at timestamptz default now(),
  finished_at timestamptz,
  status text
);

create table if not exists prices (
  id bigserial primary key,
  run_id bigint,
  row_index int,
  competitor_key text,
  url text,
  price numeric,
  shipping_flag text,
  shipping_cost numeric,
  tax_amount numeric,
  true_total numeric,
  min_total numeric,
  notes text,
  fetched_at timestamptz default now()
);
