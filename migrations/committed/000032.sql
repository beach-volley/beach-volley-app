--! Previous: sha1:91beeb95db3049bad50b5486311f0e3f46ea7864
--! Hash: sha1:c06dc10dac36e964206d60a1dcd958b6d574032a

-- Enter migration here

-- replace default user.invitations with custom version without affecting the api
CREATE or replace FUNCTION beachvolley_public.user_invitations(u beachvolley_public."user") RETURNS SETOF beachvolley_public.invitation
    LANGUAGE sql STABLE
    AS $$
  select i.*
  from beachvolley_public.invitation i
  left join beachvolley_public.match m on m.id = i.match_id
  where not exists (
    select 1 from beachvolley_public.join j
    where i.match_id = m.id and i.user_id = j.participant_id
  ) and i.user_id = u.id
$$;

COMMENT ON FUNCTION beachvolley_public.user_invitations(beachvolley_public."user") IS E'@sortable\n@filterable\nReads and enables pagination through a set of `Invitation`.';
grant execute on function beachvolley_public.user_invitations(beachvolley_public."user") to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;

COMMENT ON CONSTRAINT "invitation_user_id_fkey" ON "beachvolley_public"."invitation" IS E'@omit many';
