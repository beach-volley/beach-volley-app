--! Previous: sha1:3e78ee8af996266cf3d5bef3ca71d68f95e4aad8
--! Hash: sha1:246ccbe8d2a3f3ec2fb9c9b14b79c2a9e7e519bd

-- Enter migration here

alter default privileges revoke execute on functions from public;

grant usage on schema beachvolley_public to beachvolley_graphile_anonymous;

grant
    select,
    insert (location, time, player_limit, public),
    update (location, time, player_limit, public),
    delete
on table beachvolley_public.match to beachvolley_graphile_anonymous;
