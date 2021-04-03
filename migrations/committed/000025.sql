--! Previous: sha1:3e75fffc08dd7f73b20c7088310c277bff246303
--! Hash: sha1:59db85d5ed55879dda2b58e9ac7b60a3ffc43a6f

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
