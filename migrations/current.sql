-- Enter migration here

-- public schema
drop schema if exists beachvolley_public cascade;
create schema beachvolley_public;

-- match
create table beachvolley_public.match (
    id serial primary key
);
