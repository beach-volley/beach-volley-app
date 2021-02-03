--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

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
-- Name: beachvolley_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA beachvolley_public;


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: invitations; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public.invitations (
    id integer NOT NULL,
    match_id integer NOT NULL,
    token text DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: invitation_id_seq; Type: SEQUENCE; Schema: beachvolley_public; Owner: -
--

ALTER TABLE beachvolley_public.invitations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME beachvolley_public.invitation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: matches; Type: TABLE; Schema: beachvolley_public; Owner: -
--

CREATE TABLE beachvolley_public.matches (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: match_id_seq; Type: SEQUENCE; Schema: beachvolley_public; Owner: -
--

ALTER TABLE beachvolley_public.matches ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME beachvolley_public.match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: invitations invitation_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitations
    ADD CONSTRAINT invitation_pkey PRIMARY KEY (id);


--
-- Name: invitations invitation_token_key; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitations
    ADD CONSTRAINT invitation_token_key UNIQUE (token);


--
-- Name: matches match_pkey; Type: CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.matches
    ADD CONSTRAINT match_pkey PRIMARY KEY (id);


--
-- Name: invitations invitation_match_id_fkey; Type: FK CONSTRAINT; Schema: beachvolley_public; Owner: -
--

ALTER TABLE ONLY beachvolley_public.invitations
    ADD CONSTRAINT invitation_match_id_fkey FOREIGN KEY (match_id) REFERENCES beachvolley_public.matches(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

