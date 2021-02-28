--! Previous: sha1:be1fe3101e3319622645ab2bf6fe974ff9ab6a04
--! Hash: sha1:041987fb40e231d2beac84284347269ffd41f021

-- Enter migration here

create or replace function beachvolley_public.current_user() returns beachvolley_public.user as $$
  select *
  from beachvolley_public.user
  where uid = nullif(current_setting('jwt.claims.firebase.uid', true), '')
$$ language sql stable;

grant execute on function beachvolley_public.current_user() to beachvolley_graphile_anonymous;
grant select on table beachvolley_public.user to beachvolley_graphile_anonymous;

comment on function beachvolley_public.current_user is 'Get the current user.';

create or replace function beachvolley_public.upsert_user() returns beachvolley_public.user as $$
declare
  new_user beachvolley_public.user;
begin
  -- do nothing if called without a valid jwt
  if current_setting('jwt.claims.firebase.uid', true) is null then
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
$$ language plpgsql strict security definer;

grant execute on function beachvolley_public.upsert_user to beachvolley_graphile_anonymous;

comment on function beachvolley_public.upsert_user is 'Create user or update it''s details based on JWT.';
