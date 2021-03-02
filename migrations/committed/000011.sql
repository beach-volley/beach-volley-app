--! Previous: sha1:041987fb40e231d2beac84284347269ffd41f021
--! Hash: sha1:5d1f6e55108b4c5beb0bac5c412a3810fe5d75e5

-- Enter migration here

-- add host to match
alter table beachvolley_public.match drop column if exists host_id;
alter table beachvolley_public.match
  add column host_id int not null references beachvolley_public.user(id) on delete cascade;
create index on beachvolley_public.match (host_id);

comment on column beachvolley_public.match.host_id is 'Host and creator of the match.';
