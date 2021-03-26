--! Previous: sha1:092051fd49d5599353ba0df84de6a5fefe1ea661
--! Hash: sha1:c7043ce76776bbea8f8d8237bea986ed95476c89

-- Enter migration here

alter table beachvolley_public.invitation
  drop column if exists user_id,
  drop column if exists status,
  drop column if exists token
;
drop table if exists beachvolley_public.invitation_status;

-- create invitation status enum
create table beachvolley_public.invitation_status (
  type text primary key,
  description text
);
comment on table beachvolley_public.invitation_status is E'@enum\nInvitation status (pending, accepted, rejected, or cancelled).';
grant select on table beachvolley_public.invitation_status to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
insert into beachvolley_public.invitation_status (type) values ('pending'), ('accepted'), ('rejected'), ('cancelled');

-- add status to invitation
alter table beachvolley_public.invitation add column status text not null default 'pending' references beachvolley_public.invitation_status;
comment on column beachvolley_public.invitation.status is 'Status of the invitation. Default is PENDING.';
create index on beachvolley_public.invitation(status);

-- add user reference to invitation
alter table beachvolley_public.invitation add column user_id integer not null references beachvolley_public.user;
comment on column beachvolley_public.invitation.user_id is 'Invited user.';
create index on beachvolley_public.invitation(user_id);

-- add permissions
grant select on table beachvolley_public.invitation to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
grant insert(match_id, user_id) on table beachvolley_public.invitation to beachvolley_graphile_authenticated;
grant update(status) on table beachvolley_public.invitation to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;

-- misc
comment on table beachvolley_public.invitation is E'@omit all\nInvitation to single match sent to single user.';
comment on column beachvolley_public.invitation.id is 'Unique id of the invitation.';
comment on column beachvolley_public.invitation.match_id is 'The match to which the user has been invited.';
comment on column beachvolley_public.invitation.created_at is E'@omit all,create,delete,many,read,update';
comment on column beachvolley_public.invitation.updated_at is E'@omit all,create,delete,many,read,update';
