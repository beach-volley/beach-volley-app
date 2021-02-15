--! Previous: sha1:246ccbe8d2a3f3ec2fb9c9b14b79c2a9e7e519bd
--! Hash: sha1:bb505a4589668b260686cd68fdf426edcb4005c8

-- Enter migration here
alter table beachvolley_public.match drop column if exists participants;

alter table beachvolley_public.match
    add column participants text[] not null default array[]::text[]
        check (array_position(participants, null) is null)
;

comment on column beachvolley_public.match.participants is 'List of participant names who have joined the match.';

grant insert(participants), update(participants) on table beachvolley_public.match to beachvolley_graphile_anonymous;
