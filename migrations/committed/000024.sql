--! Previous: sha1:69cc92dc99f89de637a246855f9ece3c27f55c3c
--! Hash: sha1:3e75fffc08dd7f73b20c7088310c277bff246303

-- Enter migration here

alter table beachvolley_public.user enable row level security;
alter table beachvolley_public.match enable row level security;
alter table beachvolley_public.invitation enable row level security;
alter table beachvolley_public.join enable row level security;

drop policy if exists anyone_can_select_users on beachvolley_public.user;
create policy anyone_can_select_users on beachvolley_public.user
  for select
  using (true);

drop policy if exists anyone_can_select_public_not_cancelled_matches on beachvolley_public.match;
create policy anyone_can_select_public_not_cancelled_matches on beachvolley_public.match
  for select
  using (public = true and status != 'cancelled');

drop policy if exists anyone_can_select_joins_of_public_not_cancelled_matches on beachvolley_public.join;
create policy anyone_can_select_joins_of_public_not_cancelled_matches on beachvolley_public.join
  for select
  using (exists(
    select 1
    from beachvolley_public.match
    where id = match_id
      and public = true
      and status != 'cancelled'
  ));

drop policy if exists host_can_select_their_matches on beachvolley_public.match;
create policy host_can_select_their_matches on beachvolley_public.match
  for select
  to beachvolley_graphile_authenticated
  using (host_id = beachvolley_private.current_user_id());

drop policy if exists host_can_select_joins_of_their_matches on beachvolley_public.join;
create policy host_can_select_joins_of_their_matches on beachvolley_public.join
  for select
  to beachvolley_graphile_authenticated
  using (exists(
    select 1
    from beachvolley_public.match
    where id = match_id
      and host_id = beachvolley_private.current_user_id()
  ));

drop policy if exists host_can_select_invitations_of_their_matches on beachvolley_public.invitation;
create policy host_can_select_invitations_of_their_matches on beachvolley_public.invitation
  for select
  to beachvolley_graphile_authenticated
  using (exists(
    select 1
    from beachvolley_public.match
    where id = match_id
      and host_id = beachvolley_private.current_user_id()
  ));

drop policy if exists invited_user_can_select_their_invitations on beachvolley_public.invitation;
create policy invited_user_can_select_their_invitations on beachvolley_public.invitation
  for select
  to beachvolley_graphile_authenticated
  using (user_id = beachvolley_private.current_user_id());

drop policy if exists participant_can_select_their_joins on beachvolley_public.join;
create policy participant_can_select_their_joins on beachvolley_public.join
  for select
  to beachvolley_graphile_authenticated
  using (participant_id = beachvolley_private.current_user_id());

drop policy if exists authenticated_user_can_insert_match on beachvolley_public.match;
create policy authenticated_user_can_insert_match on beachvolley_public.match
  for insert
  to beachvolley_graphile_authenticated
  with check (true);

drop policy if exists matches_host_can_insert_invitations_to_anyone on beachvolley_public.invitation;
create policy matches_host_can_insert_invitations_to_anyone on beachvolley_public.invitation
  for insert
  to beachvolley_graphile_authenticated
  with check (exists(
    select 1
    from beachvolley_public.match
    where match.id = invitation.match_id
      and match.host_id = beachvolley_private.current_user_id()
      and invitation.user_id != beachvolley_private.current_user_id()
  ));

drop policy if exists host_can_update_their_unconfirmed_matches on beachvolley_public.match;
create policy host_can_update_their_unconfirmed_matches on beachvolley_public.match
  for update
  to beachvolley_graphile_authenticated
  using (host_id = beachvolley_private.current_user_id() and status = 'unconfirmed')
  with check (true);

drop policy if exists invited_user_can_update_their_invitations_to_unconfirmed_matches on beachvolley_public.invitation;
create policy invited_user_can_update_their_invitations_to_unconfirmed_matches on beachvolley_public.invitation
  for update
  to beachvolley_graphile_authenticated
  using (invitation.user_id = beachvolley_private.current_user_id() and exists (
    select 1
    from beachvolley_public.match
    where match.id = invitation.match_id
      and match.status = 'unconfirmed'
  ))
  with check (true);

drop policy if exists host_can_delete_invitations_from_their_unconfirmed_matches on beachvolley_public.invitation;
create policy host_can_delete_invitations_from_their_unconfirmed_matches on beachvolley_public.invitation
  for delete
  to beachvolley_graphile_authenticated
  using (exists (
    select 1
    from beachvolley_public.match
    where match.id = invitation.match_id
      and match.host_id = beachvolley_private.current_user_id()
      and match.status = 'unconfirmed'
  ));

drop policy if exists host_can_delete_join_from_their_unconfirmed_matches on beachvolley_public.join;
create policy host_can_delete_join_from_their_unconfirmed_matches on beachvolley_public.join
  for delete
  to beachvolley_graphile_authenticated
  using (exists (
    select 1
    from beachvolley_public.match
    where match.id = "join".match_id
      and match.host_id = beachvolley_private.current_user_id()
      and match.status = 'unconfirmed'
  ));

drop policy if exists participant_can_delete_their_joins_from_unconfirmed_matches on beachvolley_public.join;
create policy participant_can_delete_their_joins_from_unconfirmed_matches on beachvolley_public.join
  for delete
  to beachvolley_graphile_authenticated
  using (participant_id = beachvolley_private.current_user_id() and exists (
    select 1
    from beachvolley_public.match
    where match.id = "join".match_id
      and match.status = 'unconfirmed'
  ));
