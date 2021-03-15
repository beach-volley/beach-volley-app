--! Previous: sha1:bf496e7f20b5e7e414f82fe456f552a9fbf89809
--! Hash: sha1:da377ff8a924d0c8f2c9876b9ebc25b1cdbe8304

-- Enter migration here

CREATE INDEX ON beachvolley_public.match (required_skill_level);
CREATE INDEX ON beachvolley_public.match (match_type);
