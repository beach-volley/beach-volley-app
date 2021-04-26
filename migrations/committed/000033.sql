--! Previous: sha1:c06dc10dac36e964206d60a1dcd958b6d574032a
--! Hash: sha1:97880d8e5ee0dfa0d6181e83b49853fe4a7f6bf4

-- Enter migration here

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
      'link', concat('/single-game/', match.id)
    )
  )
  from beachvolley_public.match
  left join beachvolley_public.user host on host.id = match.host_id
  left join beachvolley_private.user invited on invited.user_id = new.user_id
  where match.id = new.match_id;

  return null;
end;
$$;
