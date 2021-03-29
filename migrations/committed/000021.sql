--! Previous: sha1:c7043ce76776bbea8f8d8237bea986ed95476c89
--! Hash: sha1:8fa284cc37fda7a0d9af98ff5c0a78364c81e0f5

-- Enter migration here

-- enable unjoin
grant delete on table beachvolley_public.join to beachvolley_graphile_authenticated;

alter table beachvolley_public.match
  drop column if exists status
;
drop table if exists beachvolley_public.match_status;

-- create invitation status enum
create table beachvolley_public.match_status (
  type text primary key,
  description text
);
comment on table beachvolley_public.match_status is E'@enum\nMatch status (unconfirmed, confirmed, or cancelled).';
grant select on table beachvolley_public.match_status to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
insert into beachvolley_public.match_status (type) values ('unconfirmed'), ('confirmed'), ('cancelled');

-- add status to match
alter table beachvolley_public.match add column status text not null default 'unconfirmed' references beachvolley_public.match_status;
comment on column beachvolley_public.match.status is 'Status of the match. Default is UNCONFIRMED.';
create index on beachvolley_public.match(status);

-- add permissions
grant update(status) on table beachvolley_public.match to beachvolley_graphile_authenticated;
