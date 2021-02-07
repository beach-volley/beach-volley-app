--! Previous: sha1:73c0df4178599098a99476a2f965b07e2a39174d
--! Hash: sha1:3e78ee8af996266cf3d5bef3ca71d68f95e4aad8

-- Enter migration here

-- create private schema
drop schema if exists beachvolley_private cascade;
create schema beachvolley_private;

-- create function to update updated_at column
create function beachvolley_private.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

-- update match.updated_at automatically
create trigger match_updated_at before update
  on beachvolley_public.match
  for each row
  execute procedure beachvolley_private.set_updated_at();
