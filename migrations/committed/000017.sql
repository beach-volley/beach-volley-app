--! Previous: sha1:1aa96ceaa71cb507de9dc6d24701c088b3168973
--! Hash: sha1:a5cbf0e64fc49ddf72fd3183e18d2281b6ebec21

-- Enter migration here
CREATE INDEX ON beachvolley_public.match (required_skill_level);
CREATE INDEX ON beachvolley_public.match (match_type);
