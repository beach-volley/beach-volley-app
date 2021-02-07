--! Previous: sha1:4f5984e9607708d260e82c3d4c3ba643a18aea47
--! Hash: sha1:73c0df4178599098a99476a2f965b07e2a39174d

-- Enter migration here

alter table beachvolley_public.match
  drop column if exists updated_at,
  drop column if exists location,
  drop column if exists time,
  drop column if exists player_limit,
  drop column if exists public
;

alter table beachvolley_public.match
  add column updated_at timestamp default now(),
  add column location text,
  add column time tstzrange,
  add column player_limit int4range,
  add column public boolean not null default false
;

-- add documentation to match
comment on table beachvolley_public.match is 'A single beach volley match.';
comment on column beachvolley_public.match.id is 'Unique id of the match.';
comment on column beachvolley_public.match.location is 'Location where the match is held.';
comment on column beachvolley_public.match.time is 'Start and end time of the match.';
comment on column beachvolley_public.match.player_limit is 'Minimun and maximun number of players in the match.';
comment on column beachvolley_public.match.public is 'Is the match public or private. Default is private.';

-- hide timestamps completely from the graphql schema
comment on column beachvolley_public.match.created_at is E'@omit all,create,delete,many,read,update';
comment on column beachvolley_public.match.updated_at is E'@omit all,create,delete,many,read,update';
