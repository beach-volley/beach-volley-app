--! Previous: sha1:29c68c337ae8b57723b7c850d32e3271bb169ccb
--! Hash: sha1:b0986ca9718a2c515ce47d08d38e3993645e40ef

-- Enter migration here

-- allow anonymous user to see private matches too
drop policy if exists anyone_can_select_public_not_cancelled_matches on beachvolley_public.match;
drop policy if exists host_can_select_their_matches on beachvolley_public.match;

drop policy if exists anyone_can_select_matches on beachvolley_public.match;
create policy anyone_can_select_matches on beachvolley_public.match
  for select
  using (true);

drop policy if exists anyone_can_select_joins_of_public_not_cancelled_matches on beachvolley_public.join;
drop policy if exists host_can_select_joins_of_their_matches on beachvolley_public.join;

drop policy if exists anyone_can_select_joins on beachvolley_public.join;
create policy anyone_can_select_joins on beachvolley_public.join
  for select
  using (true);

-- add isCurrentUser field to User
CREATE or replace FUNCTION beachvolley_public.user_is_current_user(u beachvolley_public.user) RETURNS boolean AS $$
  SELECT u.id = beachvolley_private.current_user_id()
$$ LANGUAGE sql STABLE;

grant execute on function beachvolley_public.user_is_current_user(beachvolley_public.user) to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
comment on function beachvolley_public.user_is_current_user is 'Is this user current user.';
