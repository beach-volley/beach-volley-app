--! Previous: sha1:0a4ce15aaba7bebb6c86458971a8f3680dad5862
--! Hash: sha1:a4be06aae77034a59a3220dfc99d10766a54da6f

-- Enter migration here

comment on table beachvolley_public.match is E'@omit all\nA single beach volley match.';

create or replace function beachvolley_public.public_matches() returns setof beachvolley_public.match as $$
  select *
  from beachvolley_public.match
  where public = true and status = 'unconfirmed'
$$ language sql stable;

grant execute on function beachvolley_public.public_matches to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;

comment on function beachvolley_public.public_matches is 'Reads and enables pagination through a set of public matches.';
