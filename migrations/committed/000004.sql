--! Previous: sha1:d1ba26336d313bc04ae26a6165acb062bff42ed5
--! Hash: sha1:4f5984e9607708d260e82c3d4c3ba643a18aea47

-- Enter migration here

create index on beachvolley_public.invitation(match_id);
