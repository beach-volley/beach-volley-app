--! Previous: sha1:5d1f6e55108b4c5beb0bac5c412a3810fe5d75e5
--! Hash: sha1:bbb94012e2d9d310527a18dd2c24c8df2cae3816

-- Enter migration here

grant connect on database beachvolley to beachvolley_graphile;
revoke insert on table beachvolley_public.user from beachvolley_graphile;
grant usage on schema beachvolley_public to beachvolley_graphile_authenticated;
grant execute on function beachvolley_public.upsert_user to beachvolley_graphile_authenticated;
grant execute on function beachvolley_public.current_user to beachvolley_graphile_authenticated;
grant select on table beachvolley_public.user to beachvolley_graphile_authenticated;

create or replace function beachvolley_private.current_user_id() returns int as $$
  select id
  from beachvolley_public.user
  where uid = nullif(current_setting('jwt.claims.firebase.uid', true), '')
$$ language sql stable;

grant execute on function beachvolley_private.current_user_id to beachvolley_graphile_authenticated, beachvolley_graphile_anonymous;

alter table beachvolley_public.match
  alter column host_id set default beachvolley_private.current_user_id();

revoke insert, update, delete on table beachvolley_public.match from beachvolley_graphile_anonymous;
grant
  select,
  insert (location, time, player_limit, public, participants),
  update (location, time, player_limit, public, participants),
  delete
on table beachvolley_public.match to beachvolley_graphile_authenticated;
