--! Previous: sha1:8385d07c3695c7e02f446148aca47fe6fef096ef
--! Hash: sha1:2d8ee8f689c5b1395e435a8780b1177cf0fc5e39

-- Enter migration here

-- add isFull field to Match
CREATE or replace FUNCTION beachvolley_public.match_is_full(match beachvolley_public.match) RETURNS boolean AS $$
  select count(*) >= upper(match.player_limit) - 1
  from beachvolley_public.join
  where match_id = match.id
$$ LANGUAGE sql STABLE;

grant execute on function beachvolley_public.match_is_full(beachvolley_public.match) to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
comment on function beachvolley_public.match_is_full is 'Has this match already reached the maximum number of players.';

-- update this function: prevent joining when player limit is already reached
CREATE or replace FUNCTION beachvolley_public."join"(match_id uuid) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  if exists (
    select 1
    from beachvolley_public.match
    where id = match_id
      and status = 'unconfirmed'
      and not beachvolley_public.match_is_full(match)
  ) then
    insert into beachvolley_public.join (match_id, participant_id)
      values (match_id, beachvolley_private.current_user_id())
      returning * into new_join;

    return new_join;
  end if;

  return null;
end;
$$;

-- update this function: prevent joining when player limit is already reached
CREATE or replace FUNCTION beachvolley_public.join_anonymously(match_id uuid, name text) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  if exists (
    select 1
    from beachvolley_public.match
    where id = match_id
      and public = false
      and status = 'unconfirmed'
      and not beachvolley_public.match_is_full(match)
  ) then
    insert into beachvolley_public.join (match_id, name)
      values (match_id, name)
      returning * into new_join;

    return new_join;
  end if;

  return null;
end;
$$;
