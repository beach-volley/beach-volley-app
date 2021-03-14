--! Previous: sha1:5498a9c262993df4299d8c0c3b418ed8198428c3
--! Hash: sha1:bf496e7f20b5e7e414f82fe456f552a9fbf89809

-- Enter migration here

drop function if exists beachvolley_public.join_anonymously;
create function beachvolley_public.join_anonymously(match_id integer, name text) returns beachvolley_public.join as $$
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
$$ language plpgsql strict security definer;
grant execute on function beachvolley_public.join_anonymously to beachvolley_graphile_anonymous;
comment on function beachvolley_public.join_anonymously is 'Join with name to the private match. _Anonymous user only._';

drop function if exists beachvolley_public.join;
create function beachvolley_public.join(match_id integer) returns beachvolley_public.join as $$
declare
  new_join beachvolley_public.join;
begin
  insert into beachvolley_public.join (match_id, participant_id)
    values (match_id, beachvolley_private.current_user_id())
    returning * into new_join;

  return new_join;
end;
$$ language plpgsql strict security definer;
grant execute on function beachvolley_public.join to beachvolley_graphile_authenticated;
comment on function beachvolley_public.join is 'Join current user to the match.';
