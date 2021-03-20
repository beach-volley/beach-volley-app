--! Previous: sha1:bf496e7f20b5e7e414f82fe456f552a9fbf89809
--! Hash: sha1:1aa96ceaa71cb507de9dc6d24701c088b3168973

-- Enter migration here

create or replace FUNCTION beachvolley_public.upsert_user() RETURNS beachvolley_public."user"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_user beachvolley_public.user;
begin
  -- do nothing if called without a valid jwt
  if current_setting('jwt.claims.firebase.uid', true) is null or current_setting('jwt.claims.firebase.uid', true) = '' then
    return null;
  end if;

  -- upsert public part of user
  insert into beachvolley_public.user (uid, name)
  values (current_setting('jwt.claims.firebase.uid', true), current_setting('jwt.claims.firebase.name', true))
  on conflict (uid) do update set name = current_setting('jwt.claims.firebase.name', true)
  returning * into new_user;

  -- upsert private part of user
  insert into beachvolley_private.user (user_id, email)
  values (new_user.id, current_setting('jwt.claims.firebase.email', true))
  on conflict (user_id) do update set email = current_setting('jwt.claims.firebase.email', true);

  -- return the created user (public part)
  return new_user;
end;
$$;
