--! Previous: sha1:3e75fffc08dd7f73b20c7088310c277bff246303
--! Hash: sha1:0a4ce15aaba7bebb6c86458971a8f3680dad5862

-- Enter migration here

ALTER TABLE beachvolley_public.invitation_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE beachvolley_public.match_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE beachvolley_public.match_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE beachvolley_public.skill_level ENABLE ROW LEVEL SECURITY;

drop policy if exists anyone_can_select_invitation_statuses on beachvolley_public.invitation_status;
create policy anyone_can_select_invitation_statuses on beachvolley_public.invitation_status
  for select
  using (true);

drop policy if exists anyone_can_select_match_statuses on beachvolley_public.match_status;
create policy anyone_can_select_match_statuses on beachvolley_public.match_status
  for select
  using (true);

drop policy if exists anyone_can_select_match_types on beachvolley_public.match_type;
create policy anyone_can_select_match_types on beachvolley_public.match_type
  for select
  using (true);

drop policy if exists anyone_can_select_skill_levels on beachvolley_public.skill_level;
create policy anyone_can_select_skill_levels on beachvolley_public.skill_level
  for select
  using (true);

ALTER TABLE beachvolley_private."user" ALTER COLUMN email TYPE citext;
