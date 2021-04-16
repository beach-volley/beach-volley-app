--! Previous: sha1:b0986ca9718a2c515ce47d08d38e3993645e40ef
--! Hash: sha1:8385d07c3695c7e02f446148aca47fe6fef096ef

-- Enter migration here

-- notify participants when match is confirmed
CREATE or replace FUNCTION beachvolley_private.notify_participants_when_match_is_confirmed() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
begin
  perform graphile_worker.add_job(
    'send-push-notification-to-user',
    json_build_object(
      'tokens', fcm_tokens,
      'title', 'Peli vahvistettu',
      'message', 'Katso pelin tietoja painamalla tätä.',
      'link', concat('/single-game/', new.id)
    )
  )
  from beachvolley_public.join
  join beachvolley_public.user participant on "join".participant_id = participant.id
  join beachvolley_private.user _participant on participant.id = _participant.user_id
  where match_id = new.id;

  return null;
end;
$$;

drop trigger if exists notify_participants_when_match_is_confirmed on beachvolley_public.match;
create trigger notify_participants_when_match_is_confirmed
  after update of status on beachvolley_public.match
  for each row
  when (new.status = 'confirmed' and old.status != 'confirmed')
  execute function beachvolley_private.notify_participants_when_match_is_confirmed();

-- notify participants when match is cancelled
CREATE or replace FUNCTION beachvolley_private.notify_participants_when_match_is_cancelled() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
begin
  perform graphile_worker.add_job(
    'send-push-notification-to-user',
    json_build_object(
      'tokens', fcm_tokens,
      'title', 'Peli peruttu',
      'message', 'Katso pelin tietoja painamalla tätä.',
      'link', concat('/single-game/', new.id)
    )
  )
  from beachvolley_public.join
  join beachvolley_public.user participant on "join".participant_id = participant.id
  join beachvolley_private.user _participant on participant.id = _participant.user_id
  where match_id = new.id;

  return null;
end;
$$;

drop trigger if exists notify_participants_when_match_is_cancelled on beachvolley_public.match;
create trigger notify_participants_when_match_is_cancelled
  after update of status on beachvolley_public.match
  for each row
  when (new.status = 'cancelled' and old.status != 'cancelled')
  execute function beachvolley_private.notify_participants_when_match_is_cancelled();

-- update this function
CREATE or replace FUNCTION beachvolley_private.send_invitation() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
begin
  perform graphile_worker.add_job(
    'send-push-notification-to-user',
    json_build_object(
      'tokens', fcm_tokens,
      'title', concat(host.name, ' kutsui sinut mukaan pelaamaan.'),
      'message', 'Tarkastele kutsua napsauttamalla.',
      'link', concat('/invitations/', new.id)
    )
  )
  from beachvolley_public.match
  left join beachvolley_public.user host on host.id = match.host_id
  left join beachvolley_private.user invited on invited.user_id = new.user_id
  where match.id = new.match_id;

  return null;
end;
$$;

-- update this function
CREATE or replace FUNCTION beachvolley_private.notify_host_about_join() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
begin
  perform graphile_worker.add_job(
    'send-push-notification-to-user',
    json_build_object(
      'tokens', fcm_tokens,
      'title', concat('Pelaaja ', coalesce(new.name, participant.name), ' liittyi mukaan peliisi.'),
      'message', 'Katso pelin tietoja painamalla tätä.',
      'link', concat('/single-game/', match.id)
    )
  )
  from beachvolley_public.match
  left join beachvolley_private.user host on host.user_id = match.host_id
  left join beachvolley_public.user participant on participant.id = new.participant_id
  where match.id = new.match_id;

  return null;
end;
$$;
