--! Previous: sha1:03ab7fd5a9fcc6ddc7f76831c9660ec4cf273350
--! Hash: sha1:5a080e1f187daed2eb997400736a3948b40e8306

-- Enter migration here

alter table if exists beachvolley_public.match
    rename to matches;

alter table if exists beachvolley_public.invitation
    rename to invitations;
