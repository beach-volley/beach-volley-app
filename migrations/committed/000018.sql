--! Previous: sha1:a5cbf0e64fc49ddf72fd3183e18d2281b6ebec21
--! Hash: sha1:82a6871458a2e02688bb4975ba5b9970c1644d9f

-- Enter migration here

-- allow inserting match type, required skill level and description of match
grant insert(match_type, required_skill_level, description) on table beachvolley_public.match to beachvolley_graphile_authenticated;
