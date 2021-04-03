--! Previous: sha1:75257537bbf1876d07af644d02ae27117832791f
--! Hash: sha1:69cc92dc99f89de637a246855f9ece3c27f55c3c

-- Enter migration here

-- update invitation.updated_at automatically
drop trigger if exists invitation_updated_at on beachvolley_public.invitation;
create trigger invitation_updated_at before update
  on beachvolley_public.invitation
  for each row
  execute procedure beachvolley_private.set_updated_at();

-- send invitation to invited user when invitation is created
create or replace function beachvolley_private.send_invitation() returns trigger as $$
begin
  perform graphile_worker.add_job(
    'send-invitation-to-user',
    json_build_object(
      'tokens', fcm_tokens,
      'name', host.name,
      'link', concat('/invitations/', new.id)
    )
  )
  from beachvolley_public.match
  left join beachvolley_public.user host on host.id = match.host_id
  left join beachvolley_private.user invited on invited.user_id = new.user_id
  where match.id = new.match_id;

  return null;
end;
$$ language plpgsql strict security definer;

drop trigger if exists send_invitation on beachvolley_public.invitation;
create trigger send_invitation after insert
  on beachvolley_public.invitation
  for each row
  execute procedure beachvolley_private.send_invitation();

-- send notification to host when someone has joined
create or replace function beachvolley_private.notify_host_about_join() returns trigger as $$
begin
  perform graphile_worker.add_job(
    'send-notification-to-joined-players',
    json_build_object(
      'tokens', fcm_tokens,
      'name', coalesce(new.name, participant.name),
      'link', concat('/single-game/', match.id)
    )
  )
  from beachvolley_public.match
  left join beachvolley_private.user host on host.user_id = match.host_id
  left join beachvolley_public.user participant on participant.id = new.participant_id
  where match.id = new.match_id;

  return null;
end;
$$ language plpgsql strict security definer;

drop trigger if exists notify_host_about_join on beachvolley_public.join;
create trigger notify_host_about_join after insert
  on beachvolley_public.join
  for each row
  execute procedure beachvolley_private.notify_host_about_join();
