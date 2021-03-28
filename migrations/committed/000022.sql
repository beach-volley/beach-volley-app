--! Previous: sha1:e29ff54952460822e7705042120f2757e172f0b7
--! Hash: sha1:384e0cd8133779374fa6cb293cee4582031b8816

-- Enter migration here

truncate
  beachvolley_public.user,
  beachvolley_private.user,
  beachvolley_public.match,
  beachvolley_public.invitation,
  beachvolley_public.join
cascade;

alter table beachvolley_public.user
  drop column if exists id cascade
;
alter table beachvolley_private.user
  drop column if exists user_id cascade
;
alter table beachvolley_public.match
  drop column if exists id cascade,
  drop column if exists host_id cascade
;
alter table beachvolley_public.invitation
  drop column if exists id cascade,
  drop column if exists match_id cascade,
  drop column if exists user_id cascade
;
alter table beachvolley_public.join
  drop column if exists id cascade,
  drop column if exists match_id cascade,
  drop column if exists participant_id cascade
;

alter table beachvolley_public.user
  add column id uuid primary key default gen_random_uuid()
;

alter table beachvolley_private.user
  add column user_id uuid primary key references beachvolley_public.user on delete cascade
;

drop function beachvolley_private.current_user_id;
CREATE FUNCTION beachvolley_private.current_user_id() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select id
  from beachvolley_public.user
  where uid = nullif(current_setting('jwt.claims.firebase.uid', true), '')
$$;

alter table beachvolley_public.match
  add column id uuid primary key default gen_random_uuid(),
  add column host_id uuid not null default beachvolley_private.current_user_id() references beachvolley_public.user on delete cascade
;

alter table beachvolley_public.invitation
  add column id uuid primary key default gen_random_uuid(),
  add column match_id uuid not null references beachvolley_public.match on delete cascade,
  add column user_id uuid not null references beachvolley_public.user
;

alter table beachvolley_public.join
  add column id uuid primary key default gen_random_uuid(),
  add column match_id uuid not null references beachvolley_public.match on delete cascade,
  add column participant_id uuid references beachvolley_public.user on delete set null,
  add constraint join_check check ((num_nonnulls(participant_id, name) = 1))
;

create index on beachvolley_public.join (match_id);
create index on beachvolley_public.join (participant_id);
create unique index on beachvolley_public.join (match_id, participant_id) where (participant_id is not null);
create unique index on beachvolley_public.join (match_id, name) where (name is not null);
create index on beachvolley_public.match (host_id);
create index on beachvolley_public.invitation (match_id);
create index on beachvolley_public.invitation (user_id);

COMMENT ON COLUMN beachvolley_public."user".id IS 'Unique id of the user.';
COMMENT ON COLUMN beachvolley_public."join".id IS 'Unique id of the join.';
COMMENT ON COLUMN beachvolley_public."join".match_id IS 'Match that this join belongs to.';
COMMENT ON COLUMN beachvolley_public."join".participant_id IS 'User who is joining. Either this or `name` is given.';
COMMENT ON COLUMN beachvolley_public.invitation.id IS 'Unique id of the invitation.';
COMMENT ON COLUMN beachvolley_public.invitation.match_id IS 'The match to which the user has been invited.';
COMMENT ON COLUMN beachvolley_public.invitation.user_id	IS 'Invited user.';
COMMENT ON COLUMN beachvolley_public.match.id IS 'Unique id of the match.';
COMMENT ON COLUMN beachvolley_public.match.public IS 'Is the match public or private. Default is private.';
COMMENT ON COLUMN beachvolley_public.match.host_id IS '@omit create
Host and creator of the match.';

GRANT EXECUTE ON FUNCTION beachvolley_private.current_user_id() TO beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
GRANT INSERT(match_id, user_id) ON beachvolley_public.invitation TO beachvolley_graphile_authenticated;

alter table beachvolley_public.match alter column status set default 'unconfirmed';

drop function if exists beachvolley_public.join(match_id integer);
CREATE OR REPLACE FUNCTION beachvolley_public."join"(match_id uuid) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  insert into beachvolley_public.join (match_id, participant_id)
    values (match_id, beachvolley_private.current_user_id())
    returning * into new_join;

  return new_join;
end;
$$;
COMMENT ON FUNCTION beachvolley_public."join"(match_id uuid) IS 'Join current user to the match.';
GRANT EXECUTE ON FUNCTION beachvolley_public.join TO beachvolley_graphile_authenticated;

drop function if exists beachvolley_public.join_anonymously(match_id integer, name text);
CREATE or replace FUNCTION beachvolley_public.join_anonymously(match_id uuid, name text) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  if exists (select 1 from beachvolley_public.match where id = match_id and public = false) then
    insert into beachvolley_public.join (match_id, name)
      values (match_id, name)
      returning * into new_join;

    return new_join;
  end if;

  return null;
end;
$$;
COMMENT ON FUNCTION beachvolley_public.join_anonymously(match_id uuid, name text) IS 'Join with name to the private match. _Anonymous user only._';
GRANT EXECUTE ON FUNCTION beachvolley_public.join_anonymously TO beachvolley_graphile_anonymous;
