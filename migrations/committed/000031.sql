--! Previous: sha1:2d8ee8f689c5b1395e435a8780b1177cf0fc5e39
--! Hash: sha1:91beeb95db3049bad50b5486311f0e3f46ea7864

-- Enter migration here

create index on beachvolley_public.match(time);

COMMENT ON FUNCTION beachvolley_public.public_matches() IS E'@sortable\n@filterable\nReads and enables pagination through a set of public matches.';

create or replace function beachvolley_public.join_match_time(j beachvolley_public.join) returns tstzrange as $$
  select time
  from beachvolley_public.match
  where j.match_id = match.id
$$ language sql stable;
COMMENT ON FUNCTION beachvolley_public.join_match_time(beachvolley_public.join) IS E'@sortable\nTime of the related match.';
GRANT EXECUTE ON FUNCTION beachvolley_public.join_match_time TO beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;

create or replace function beachvolley_public.invitation_match_time(i beachvolley_public.invitation) returns tstzrange as $$
  select time
  from beachvolley_public.match
  where i.match_id = match.id
$$ language sql stable;
COMMENT ON FUNCTION beachvolley_public.invitation_match_time(beachvolley_public.invitation) IS E'@sortable\nTime of the related match.';
GRANT EXECUTE ON FUNCTION beachvolley_public.invitation_match_time TO beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
