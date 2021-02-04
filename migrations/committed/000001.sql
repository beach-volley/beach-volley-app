--! Previous: -
--! Hash: sha1:03ab7fd5a9fcc6ddc7f76831c9660ec4cf273350

-- Enter migration here

-- public schema
drop schema if exists beachvolley_public cascade;
create schema beachvolley_public;

-- basic match table
drop table  if exists beachvolley_public.match cascade;
create table beachvolley_public.match (
    id integer primary key generated always as identity,
    created_at timestamp default now()
);

-- basic invitation table
drop table if exists beachvolley_public.invitation cascade;
create table beachvolley_public.invitation (
    id integer primary key generated always as identity,
    match_id integer not null references beachvolley_public.match(id) on delete cascade,
    token text not null unique default gen_random_uuid(),
    created_at timestamp default now(),
    updated_at timestamp default now()
);
