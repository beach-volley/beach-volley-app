create extension if not exists pgcrypto;
create extension if not exists citext WITH SCHEMA public;
revoke all on schema public from public;
grant all on schema public to beachvolley_db_owner;
