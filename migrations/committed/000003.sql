--! Previous: sha1:5a080e1f187daed2eb997400736a3948b40e8306
--! Hash: sha1:d1ba26336d313bc04ae26a6165acb062bff42ed5

-- Enter migration here

-- revert back to singular table names
alter table if exists beachvolley_public.matches
    rename to match;

alter table if exists beachvolley_public.invitations
    rename to invitation;
