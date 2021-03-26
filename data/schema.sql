--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: beachvolley_private; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA beachvolley_private;


--
-- Name: beachvolley_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA beachvolley_public;


--
-- Name: postgraphile_watch; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA postgraphile_watch;


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: current_user_id(); Type: FUNCTION; Schema: beachvolley_private; Owner: -
--

CREATE FUNCTION beachvolley_private.current_user_id() RETURNS integer
    LANGUAGE sql STABLE
    AS $$
  select id
  from beachvolley_public.user
  where uid = nullif(current_setting('jwt.claims.firebase.uid', true), '')
$$;


--
-- Name: set_updated_at(); Type: FUNCTION; Schema: beachvolley_private; Owner: -
--

CREATE FUNCTION beachvolley_private.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$;


--
-- Name: add_fcm_token(text); Type: FUNCTION; Schema: beachvolley_public; Owner: -
--

CREATE FUNCTION beachvolley_public.add_fcm_token(token text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
begin
  update beachvolley_private.user
    set fcm_tokens = array_append(fcm_tokens, token)
    where user_id = beachvolley_private.current_user_id()
      and not string_to_array(token, '') && fcm_tokens;
end;
$$;


--
-- Name: FUNCTION add_fcm_token(token text); Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON FUNCTION beachvolley_public.add_fcm_token(token text) IS 'Assign Firebase Cloud Messaging registration token to the current user.';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public."user" (
    id integer NOT NULL,
    uid text NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: TABLE "user"; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON TABLE beachvolley_public."user" IS 'A user of the app.';


--
-- Name: COLUMN "user".id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."user".id IS 'Unique id of the user.';


--
-- Name: COLUMN "user".uid; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."user".uid IS '@omit all,create,delete,many,read,update';


--
-- Name: COLUMN "user".name; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."user".name IS 'Display name of the user.';


--
-- Name: COLUMN "user".created_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."user".created_at IS '@omit all,create,delete,many,read,update';


--
-- Name: COLUMN "user".updated_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."user".updated_at IS '@omit all,create,delete,many,read,update';


--
-- Name: current_user(); Type: FUNCTION; Schema: beachvolley_public; Owner: -
--

CREATE FUNCTION beachvolley_public."current_user"() RETURNS beachvolley_public."user"
    LANGUAGE sql STABLE
    AS $$
  select *
  from beachvolley_public.user
  where uid = nullif(current_setting('jwt.claims.firebase.uid', true), '')
$$;


--
-- Name: FUNCTION "current_user"(); Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON FUNCTION beachvolley_public."current_user"() IS 'Get the current user.';


--
-- Name: join; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public."join" (
    id integer NOT NULL,
    match_id integer NOT NULL,
    participant_id integer,
    name text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT join_check CHECK ((num_nonnulls(participant_id, name) = 1))
);


--
-- Name: TABLE "join"; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON TABLE beachvolley_public."join" IS 'Participant of a single match.';


--
-- Name: COLUMN "join".id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."join".id IS 'Unique id of the join.';


--
-- Name: COLUMN "join".match_id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."join".match_id IS 'Match that this join belongs to.';


--
-- Name: COLUMN "join".participant_id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."join".participant_id IS 'User who is joining. Either this or `name` is given.';


--
-- Name: COLUMN "join".name; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."join".name IS 'Name of anonymous user who is joining. Either this or `participant` is given.';


--
-- Name: COLUMN "join".created_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."join".created_at IS '@omit all,create,delete,many,read,update';


--
-- Name: COLUMN "join".updated_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public."join".updated_at IS '@omit all,create,delete,many,read,update';


--
-- Name: join(integer); Type: FUNCTION; Schema: beachvolley_public; Owner: -
--

CREATE FUNCTION beachvolley_public."join"(match_id integer) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  insert into beachvolley_public.join (match_id, participant_id)
    values (match_id, beachvolley_private.current_user_id())
    returning * into new_join;

  return new_join;
end;
$$;


--
-- Name: FUNCTION "join"(match_id integer); Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON FUNCTION beachvolley_public."join"(match_id integer) IS 'Join current user to the match.';


--
-- Name: join_anonymously(integer, text); Type: FUNCTION; Schema: beachvolley_public; Owner: -
--

CREATE FUNCTION beachvolley_public.join_anonymously(match_id integer, name text) RETURNS beachvolley_public."join"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_join beachvolley_public.join;
begin
  if exists (select 1 from beachvolley_public.match where id = match_id and public = false) then
    insert into beachvolley_public.join (match_id, name)
      values (match_id, name)
      returning * into new_join;

    return new_join;
  end if;

  return null;
end;
$$;


--
-- Name: FUNCTION join_anonymously(match_id integer, name text); Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON FUNCTION beachvolley_public.join_anonymously(match_id integer, name text) IS 'Join with name to the private match. _Anonymous user only._';


--
-- Name: upsert_user(); Type: FUNCTION; Schema: beachvolley_public; Owner: -
--

CREATE FUNCTION beachvolley_public.upsert_user() RETURNS beachvolley_public."user"
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
declare
  new_user beachvolley_public.user;
begin
  -- do nothing if called without a valid jwt
  if current_setting('jwt.claims.firebase.uid', true) is null or current_setting('jwt.claims.firebase.uid', true) = '' then
    return null;
  end if;

  -- upsert public part of user
  insert into beachvolley_public.user (uid, name)
  values (current_setting('jwt.claims.firebase.uid', true), current_setting('jwt.claims.firebase.name', true))
  on conflict (uid) do update set name = current_setting('jwt.claims.firebase.name', true)
  returning * into new_user;

  -- upsert private part of user
  insert into beachvolley_private.user (user_id, email)
  values (new_user.id, current_setting('jwt.claims.firebase.email', true))
  on conflict (user_id) do update set email = current_setting('jwt.claims.firebase.email', true);

  -- return the created user (public part)
  return new_user;
end;
$$;


--
-- Name: FUNCTION upsert_user(); Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON FUNCTION beachvolley_public.upsert_user() IS 'Create user or update it''s details based on JWT.';


--
-- Name: notify_watchers_ddl(); Type: FUNCTION; Schema: postgraphile_watch; Owner: -
--

CREATE FUNCTION postgraphile_watch.notify_watchers_ddl() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'ddl',
      'payload',
      (select json_agg(json_build_object('schema', schema_name, 'command', command_tag)) from pg_event_trigger_ddl_commands() as x)
    )::text
  );
end;
$$;


--
-- Name: notify_watchers_drop(); Type: FUNCTION; Schema: postgraphile_watch; Owner: -
--

CREATE FUNCTION postgraphile_watch.notify_watchers_drop() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
begin
  perform pg_notify(
    'postgraphile_watch',
    json_build_object(
      'type',
      'drop',
      'payload',
      (select json_agg(distinct x.schema_name) from pg_event_trigger_dropped_objects() as x)
    )::text
  );
end;
$$;


--
-- Name: user; Type: TABLE; Schema: beachvolley_private; Owner: -
--

CREATE TABLE beachvolley_private."user" (
    user_id integer NOT NULL,
    email text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    fcm_tokens text[] DEFAULT '{}'::text[] NOT NULL,
    CONSTRAINT user_email_check CHECK ((email ~* '^.+@.+\..+$'::text))
);


--
-- Name: invitation; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public.invitation (
    id integer NOT NULL,
    match_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    status text DEFAULT 'pending'::text NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: TABLE invitation; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON TABLE beachvolley_public.invitation IS '@omit all
Invitation to single match sent to single user.';


--
-- Name: COLUMN invitation.id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.invitation.id IS 'Unique id of the invitation.';


--
-- Name: COLUMN invitation.match_id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.invitation.match_id IS 'The match to which the user has been invited.';


--
-- Name: COLUMN invitation.created_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.invitation.created_at IS '@omit all,create,delete,many,read,update';


--
-- Name: COLUMN invitation.updated_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.invitation.updated_at IS '@omit all,create,delete,many,read,update';


--
-- Name: COLUMN invitation.status; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.invitation.status IS 'Status of the invitation. Default is PENDING.';


--
-- Name: COLUMN invitation.user_id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.invitation.user_id IS 'Invited user.';


--
-- Name: invitation_id_seq; Type: SEQUENCE; Schema: beachvolley_public; Owner: -
--

ALTER TABLE beachvolley_public.invitation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME beachvolley_public.invitation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: invitation_status; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public.invitation_status (
    type text NOT NULL,
    description text
);


--
-- Name: TABLE invitation_status; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON TABLE beachvolley_public.invitation_status IS '@enum
Invitation status (pending, accepted, rejected, or cancelled).';


--
-- Name: join_id_seq; Type: SEQUENCE; Schema: beachvolley_public; Owner: -
--

ALTER TABLE beachvolley_public."join" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME beachvolley_public.join_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: match; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public.match (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    location text,
    "time" tstzrange,
    player_limit int4range,
    public boolean DEFAULT false NOT NULL,
    host_id integer DEFAULT beachvolley_private.current_user_id() NOT NULL,
    match_type text DEFAULT 'mixed'::text NOT NULL,
    required_skill_level text DEFAULT 'easy-hard'::text NOT NULL,
    description text
);


--
-- Name: TABLE match; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON TABLE beachvolley_public.match IS 'A single beach volley match.';


--
-- Name: COLUMN match.id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.id IS 'Unique id of the match.';


--
-- Name: COLUMN match.created_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.created_at IS '@omit all,create,delete,many,read,update';


--
-- Name: COLUMN match.updated_at; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.updated_at IS '@omit all,create,delete,many,read,update';


--
-- Name: COLUMN match.location; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.location IS 'Location where the match is held.';


--
-- Name: COLUMN match."time"; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match."time" IS 'Start and end time of the match.';


--
-- Name: COLUMN match.player_limit; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.player_limit IS 'Minimun and maximun number of players in the match.';


--
-- Name: COLUMN match.public; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.public IS 'Is the match public or private. Default is private.';


--
-- Name: COLUMN match.host_id; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.host_id IS '@omit create
Host and creator of the match.';


--
-- Name: COLUMN match.match_type; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.match_type IS 'Is the match men only, women only, or mixed. Default is mixed.';


--
-- Name: COLUMN match.required_skill_level; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.required_skill_level IS 'Required player skill level for the match. Default is EASY_HARD.';


--
-- Name: COLUMN match.description; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON COLUMN beachvolley_public.match.description IS 'Optional description of the match.';


--
-- Name: match_id_seq; Type: SEQUENCE; Schema: beachvolley_public; Owner: -
--

ALTER TABLE beachvolley_public.match ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME beachvolley_public.match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: match_type; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public.match_type (
    type text NOT NULL,
    description text
);


--
-- Name: TABLE match_type; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON TABLE beachvolley_public.match_type IS '@enum
Match type (men, women, or mixed).';


--
-- Name: skill_level; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public.skill_level (
    type text NOT NULL,
    description text
);


--
-- Name: TABLE skill_level; Type: COMMENT; Schema: beachvolley_public; Owner: -
--

COMMENT ON TABLE beachvolley_public.skill_level IS '@enum
Skill level (easy, medium, hard, or a combination of them).';


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: beachvolley_public; Owner: -
--

ALTER TABLE beachvolley_public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME beachvolley_public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: beachvolley_private; Owner: -
--

ALTER TABLE ONLY beachvolley_private."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: beachvolley_private; Owner: -
--

ALTER TABLE ONLY beachvolley_private."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: invitation invitation_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitation
    ADD CONSTRAINT invitation_pkey PRIMARY KEY (id);


--
-- Name: invitation_status invitation_status_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitation_status
    ADD CONSTRAINT invitation_status_pkey PRIMARY KEY (type);


--
-- Name: join join_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public."join"
    ADD CONSTRAINT join_pkey PRIMARY KEY (id);


--
-- Name: match match_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.match
    ADD CONSTRAINT match_pkey PRIMARY KEY (id);


--
-- Name: match_type match_type_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.match_type
    ADD CONSTRAINT match_type_pkey PRIMARY KEY (type);


--
-- Name: skill_level skill_level_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.skill_level
    ADD CONSTRAINT skill_level_pkey PRIMARY KEY (type);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_uid_key; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public."user"
    ADD CONSTRAINT user_uid_key UNIQUE (uid);


--
-- Name: invitation_match_id_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX invitation_match_id_idx ON beachvolley_public.invitation USING btree (match_id);


--
-- Name: invitation_status_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX invitation_status_idx ON beachvolley_public.invitation USING btree (status);


--
-- Name: invitation_user_id_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX invitation_user_id_idx ON beachvolley_public.invitation USING btree (user_id);


--
-- Name: join_match_id_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX join_match_id_idx ON beachvolley_public."join" USING btree (match_id);


--
-- Name: join_match_id_name_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE UNIQUE INDEX join_match_id_name_idx ON beachvolley_public."join" USING btree (match_id, name) WHERE (name IS NOT NULL);


--
-- Name: join_match_id_participant_id_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE UNIQUE INDEX join_match_id_participant_id_idx ON beachvolley_public."join" USING btree (match_id, participant_id) WHERE (participant_id IS NOT NULL);


--
-- Name: join_participant_id_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX join_participant_id_idx ON beachvolley_public."join" USING btree (participant_id);


--
-- Name: match_host_id_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX match_host_id_idx ON beachvolley_public.match USING btree (host_id);


--
-- Name: match_match_type_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX match_match_type_idx ON beachvolley_public.match USING btree (match_type);


--
-- Name: match_required_skill_level_idx; Type: INDEX; Schema: beachvolley_public; Owner: -
--

CREATE INDEX match_required_skill_level_idx ON beachvolley_public.match USING btree (required_skill_level);


--
-- Name: user user_private_updated_at; Type: TRIGGER; Schema: beachvolley_private; Owner: -
--

CREATE TRIGGER user_private_updated_at BEFORE UPDATE ON beachvolley_private."user" FOR EACH ROW EXECUTE FUNCTION beachvolley_private.set_updated_at();


--
-- Name: join join_updated_at; Type: TRIGGER; Schema: beachvolley_public; Owner: -
--

CREATE TRIGGER join_updated_at BEFORE UPDATE ON beachvolley_public."join" FOR EACH ROW EXECUTE FUNCTION beachvolley_private.set_updated_at();


--
-- Name: match match_updated_at; Type: TRIGGER; Schema: beachvolley_public; Owner: -
--

CREATE TRIGGER match_updated_at BEFORE UPDATE ON beachvolley_public.match FOR EACH ROW EXECUTE FUNCTION beachvolley_private.set_updated_at();


--
-- Name: user user_updated_at; Type: TRIGGER; Schema: beachvolley_public; Owner: -
--

CREATE TRIGGER user_updated_at BEFORE UPDATE ON beachvolley_public."user" FOR EACH ROW EXECUTE FUNCTION beachvolley_private.set_updated_at();


--
-- Name: user user_user_id_fkey; Type: FK CONSTRAINT; Schema: beachvolley_private; Owner: -
--

ALTER TABLE ONLY beachvolley_private."user"
    ADD CONSTRAINT user_user_id_fkey FOREIGN KEY (user_id) REFERENCES beachvolley_public."user"(id) ON DELETE CASCADE;


--
-- Name: invitation invitation_match_id_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitation
    ADD CONSTRAINT invitation_match_id_fkey FOREIGN KEY (match_id) REFERENCES beachvolley_public.match(id) ON DELETE CASCADE;


--
-- Name: invitation invitation_status_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitation
    ADD CONSTRAINT invitation_status_fkey FOREIGN KEY (status) REFERENCES beachvolley_public.invitation_status(type);


--
-- Name: invitation invitation_user_id_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitation
    ADD CONSTRAINT invitation_user_id_fkey FOREIGN KEY (user_id) REFERENCES beachvolley_public."user"(id);


--
-- Name: join join_match_id_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public."join"
    ADD CONSTRAINT join_match_id_fkey FOREIGN KEY (match_id) REFERENCES beachvolley_public.match(id) ON DELETE CASCADE;


--
-- Name: join join_participant_id_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public."join"
    ADD CONSTRAINT join_participant_id_fkey FOREIGN KEY (participant_id) REFERENCES beachvolley_public."user"(id) ON DELETE SET NULL;


--
-- Name: match match_host_id_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.match
    ADD CONSTRAINT match_host_id_fkey FOREIGN KEY (host_id) REFERENCES beachvolley_public."user"(id) ON DELETE CASCADE;


--
-- Name: match match_match_type_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.match
    ADD CONSTRAINT match_match_type_fkey FOREIGN KEY (match_type) REFERENCES beachvolley_public.match_type(type);


--
-- Name: match match_required_skill_level_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.match
    ADD CONSTRAINT match_required_skill_level_fkey FOREIGN KEY (required_skill_level) REFERENCES beachvolley_public.skill_level(type);


--
-- Name: SCHEMA beachvolley_public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA beachvolley_public TO beachvolley_graphile_anonymous;
GRANT USAGE ON SCHEMA beachvolley_public TO beachvolley_graphile_authenticated;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO beachvolley_db_owner;


--
-- Name: FUNCTION current_user_id(); Type: ACL; Schema: beachvolley_private; Owner: -
--

REVOKE ALL ON FUNCTION beachvolley_private.current_user_id() FROM PUBLIC;
GRANT ALL ON FUNCTION beachvolley_private.current_user_id() TO beachvolley_graphile_authenticated;
GRANT ALL ON FUNCTION beachvolley_private.current_user_id() TO beachvolley_graphile_anonymous;


--
-- Name: FUNCTION add_fcm_token(token text); Type: ACL; Schema: beachvolley_public; Owner: -
--

REVOKE ALL ON FUNCTION beachvolley_public.add_fcm_token(token text) FROM PUBLIC;
GRANT ALL ON FUNCTION beachvolley_public.add_fcm_token(token text) TO beachvolley_graphile_authenticated;


--
-- Name: TABLE "user"; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT SELECT ON TABLE beachvolley_public."user" TO beachvolley_graphile_anonymous;
GRANT SELECT ON TABLE beachvolley_public."user" TO beachvolley_graphile_authenticated;


--
-- Name: FUNCTION "current_user"(); Type: ACL; Schema: beachvolley_public; Owner: -
--

REVOKE ALL ON FUNCTION beachvolley_public."current_user"() FROM PUBLIC;
GRANT ALL ON FUNCTION beachvolley_public."current_user"() TO beachvolley_graphile_anonymous;
GRANT ALL ON FUNCTION beachvolley_public."current_user"() TO beachvolley_graphile_authenticated;


--
-- Name: TABLE "join"; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT SELECT ON TABLE beachvolley_public."join" TO beachvolley_graphile_anonymous;
GRANT SELECT ON TABLE beachvolley_public."join" TO beachvolley_graphile_authenticated;


--
-- Name: FUNCTION "join"(match_id integer); Type: ACL; Schema: beachvolley_public; Owner: -
--

REVOKE ALL ON FUNCTION beachvolley_public."join"(match_id integer) FROM PUBLIC;
GRANT ALL ON FUNCTION beachvolley_public."join"(match_id integer) TO beachvolley_graphile_authenticated;


--
-- Name: FUNCTION join_anonymously(match_id integer, name text); Type: ACL; Schema: beachvolley_public; Owner: -
--

REVOKE ALL ON FUNCTION beachvolley_public.join_anonymously(match_id integer, name text) FROM PUBLIC;
GRANT ALL ON FUNCTION beachvolley_public.join_anonymously(match_id integer, name text) TO beachvolley_graphile_anonymous;


--
-- Name: FUNCTION upsert_user(); Type: ACL; Schema: beachvolley_public; Owner: -
--

REVOKE ALL ON FUNCTION beachvolley_public.upsert_user() FROM PUBLIC;
GRANT ALL ON FUNCTION beachvolley_public.upsert_user() TO beachvolley_graphile_anonymous;
GRANT ALL ON FUNCTION beachvolley_public.upsert_user() TO beachvolley_graphile_authenticated;


--
-- Name: TABLE invitation; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT SELECT ON TABLE beachvolley_public.invitation TO beachvolley_graphile_anonymous;
GRANT SELECT ON TABLE beachvolley_public.invitation TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN invitation.match_id; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(match_id) ON TABLE beachvolley_public.invitation TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN invitation.status; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT UPDATE(status) ON TABLE beachvolley_public.invitation TO beachvolley_graphile_anonymous;
GRANT UPDATE(status) ON TABLE beachvolley_public.invitation TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN invitation.user_id; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(user_id) ON TABLE beachvolley_public.invitation TO beachvolley_graphile_authenticated;


--
-- Name: TABLE invitation_status; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT SELECT ON TABLE beachvolley_public.invitation_status TO beachvolley_graphile_anonymous;
GRANT SELECT ON TABLE beachvolley_public.invitation_status TO beachvolley_graphile_authenticated;


--
-- Name: TABLE match; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT SELECT ON TABLE beachvolley_public.match TO beachvolley_graphile_anonymous;
GRANT SELECT,DELETE ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN match.location; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(location),UPDATE(location) ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN match."time"; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT("time"),UPDATE("time") ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN match.player_limit; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(player_limit),UPDATE(player_limit) ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN match.public; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(public),UPDATE(public) ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN match.match_type; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(match_type),UPDATE(match_type) ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN match.required_skill_level; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(required_skill_level),UPDATE(required_skill_level) ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: COLUMN match.description; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT INSERT(description),UPDATE(description) ON TABLE beachvolley_public.match TO beachvolley_graphile_authenticated;


--
-- Name: TABLE match_type; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT SELECT ON TABLE beachvolley_public.match_type TO beachvolley_graphile_anonymous;
GRANT SELECT ON TABLE beachvolley_public.match_type TO beachvolley_graphile_authenticated;


--
-- Name: TABLE skill_level; Type: ACL; Schema: beachvolley_public; Owner: -
--

GRANT SELECT ON TABLE beachvolley_public.skill_level TO beachvolley_graphile_anonymous;
GRANT SELECT ON TABLE beachvolley_public.skill_level TO beachvolley_graphile_authenticated;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE beachvolley_db_owner REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- Name: postgraphile_watch_ddl; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER postgraphile_watch_ddl ON ddl_command_end
         WHEN TAG IN ('ALTER AGGREGATE', 'ALTER DOMAIN', 'ALTER EXTENSION', 'ALTER FOREIGN TABLE', 'ALTER FUNCTION', 'ALTER POLICY', 'ALTER SCHEMA', 'ALTER TABLE', 'ALTER TYPE', 'ALTER VIEW', 'COMMENT', 'CREATE AGGREGATE', 'CREATE DOMAIN', 'CREATE EXTENSION', 'CREATE FOREIGN TABLE', 'CREATE FUNCTION', 'CREATE INDEX', 'CREATE POLICY', 'CREATE RULE', 'CREATE SCHEMA', 'CREATE TABLE', 'CREATE TABLE AS', 'CREATE VIEW', 'DROP AGGREGATE', 'DROP DOMAIN', 'DROP EXTENSION', 'DROP FOREIGN TABLE', 'DROP FUNCTION', 'DROP INDEX', 'DROP OWNED', 'DROP POLICY', 'DROP RULE', 'DROP SCHEMA', 'DROP TABLE', 'DROP TYPE', 'DROP VIEW', 'GRANT', 'REVOKE', 'SELECT INTO')
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_ddl();


--
-- Name: postgraphile_watch_drop; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER postgraphile_watch_drop ON sql_drop
   EXECUTE FUNCTION postgraphile_watch.notify_watchers_drop();


--
-- PostgreSQL database dump complete
--

