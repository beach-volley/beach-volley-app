--! Previous: sha1:bb505a4589668b260686cd68fdf426edcb4005c8
--! Hash: sha1:be1fe3101e3319622645ab2bf6fe974ff9ab6a04

-- Enter migration here

drop table if exists beachvolley_public.user cascade;
create table beachvolley_public.user (
  id integer primary key generated always as identity,
  uid text not null unique,
  name text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create trigger user_updated_at before update
  on beachvolley_public.user
  for each row
  execute procedure beachvolley_private.set_updated_at();

drop table if exists beachvolley_private.user cascade;
create table beachvolley_private.user (
  user_id integer primary key references beachvolley_public.user(id) on delete cascade,
  email text not null unique check (email ~* '^.+@.+\..+$'),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create trigger user_private_updated_at before update
  on beachvolley_private.user
  for each row
  execute procedure beachvolley_private.set_updated_at();

comment on table beachvolley_public.user is 'A user of the app.';
comment on column beachvolley_public.user.id is 'Unique id of the user.';
comment on column beachvolley_public.user.uid is E'@omit all,create,delete,many,read,update';
comment on column beachvolley_public.user.name is 'Display name of the user.';
comment on column beachvolley_public.user.created_at is E'@omit all,create,delete,many,read,update';
comment on column beachvolley_public.user.updated_at is E'@omit all,create,delete,many,read,update';
