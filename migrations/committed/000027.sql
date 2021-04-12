--! Previous: sha1:a4be06aae77034a59a3220dfc99d10766a54da6f
--! Hash: sha1:29c68c337ae8b57723b7c850d32e3271bb169ccb

-- Enter migration here

CREATE or replace FUNCTION beachvolley_public."join"(match_id uuid) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  if exists (select 1 from beachvolley_public.match where id = match_id and status = 'unconfirmed') then
    insert into beachvolley_public.join (match_id, participant_id)
      values (match_id, beachvolley_private.current_user_id())
      returning * into new_join;

    return new_join;
  end if;

  return null;
end;
$$;

CREATE or replace FUNCTION beachvolley_public.join_anonymously(match_id uuid, name text) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  if exists (select 1 from beachvolley_public.match where id = match_id and public = false and status = 'unconfirmed') then
    insert into beachvolley_public.join (match_id, name)
      values (match_id, name)
      returning * into new_join;

    return new_join;
  end if;

  return null;
end;
$$;
