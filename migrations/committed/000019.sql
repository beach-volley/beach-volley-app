--! Previous: sha1:82a6871458a2e02688bb4975ba5b9970c1644d9f
--! Hash: sha1:092051fd49d5599353ba0df84de6a5fefe1ea661

-- Enter migration here

-- add fcm_tokens field
alter table beachvolley_private.user drop column if exists fcm_tokens;
alter table beachvolley_private.user
  add column fcm_tokens text[] not null default '{}'::text[];

-- create function that adds token to current user if not already added
create or replace function beachvolley_public.add_fcm_token(token text) returns void as $$
begin
  update beachvolley_private.user
    set fcm_tokens = array_append(fcm_tokens, token)
    where user_id = beachvolley_private.current_user_id()
      and not string_to_array(token, '') && fcm_tokens;
end;
$$ language plpgsql strict security definer;

grant execute on function beachvolley_public.add_fcm_token to beachvolley_graphile_authenticated;

comment on function beachvolley_public.add_fcm_token is 'Assign Firebase Cloud Messaging registration token to the current user.';
