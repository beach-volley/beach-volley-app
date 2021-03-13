--! Previous: sha1:bae7adc100886b6bc1313893cfea494265d91a20
--! Hash: sha1:5498a9c262993df4299d8c0c3b418ed8198428c3

-- Enter migration here

-- revert changes for idempotency
drop table if exists beachvolley_public.join;

-- add join table
create table beachvolley_public.join (
  id integer primary key generated always as identity,
  match_id integer not null references beachvolley_public.match(id) on delete cascade,
  participant_id integer references beachvolley_public.user(id) on delete set null,
  name text,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  check (num_nonnulls(participant_id, name) = 1) -- check that either participant_id or name is given
);

create trigger join_updated_at before update
  on beachvolley_public.join
  for each row
  execute procedure beachvolley_private.set_updated_at();

create index on beachvolley_public.join (match_id);
create index on beachvolley_public.join (participant_id);
create unique index on beachvolley_public.join (match_id, participant_id) where (participant_id is not null);
create unique index on beachvolley_public.join (match_id, name) where (name is not null);

comment on table beachvolley_public.join is 'Participant of a single match.';
comment on column beachvolley_public.join.id is 'Unique id of the join.';
comment on column beachvolley_public.join.match_id is 'Match that this join belongs to.';
comment on column beachvolley_public.join.participant_id is 'User who is joining. Either this or `name` is given.';
comment on column beachvolley_public.join.name is 'Name of anonymous user who is joining. Either this or `participant` is given.';
comment on column beachvolley_public.join.created_at is '@omit all,create,delete,many,read,update';
comment on column beachvolley_public.join.updated_at is '@omit all,create,delete,many,read,update';

grant select on table beachvolley_public.join to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;

-- drop participants field from match as join is replacing it
alter table beachvolley_public.match drop column if exists participants;

-- remove host from createMatch mutation as it is not allowed there anyways
comment on column beachvolley_public.match.host_id is E'@omit create\nHost and creator of the match.';

-- allow updating match type, required skill level and description of match
grant update(match_type, required_skill_level, description) on table beachvolley_public.match to beachvolley_graphile_authenticated;
