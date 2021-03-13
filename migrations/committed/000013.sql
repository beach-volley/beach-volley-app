--! Previous: sha1:bbb94012e2d9d310527a18dd2c24c8df2cae3816
--! Hash: sha1:bae7adc100886b6bc1313893cfea494265d91a20

-- Enter migration here

-- revert changes for idempotency
alter table beachvolley_public.match
    drop column if exists match_type,
    drop column if exists required_skill_level,
    drop column if exists description
;
drop table if exists beachvolley_public.match_type;
drop table if exists beachvolley_public.skill_level;

-- create match type enum
create table beachvolley_public.match_type (
    type text primary key,
    description text
);
comment on table beachvolley_public.match_type is E'@enum\nMatch type (men, women, or mixed).';
grant select on table beachvolley_public.match_type to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
insert into beachvolley_public.match_type (type) values ('men'), ('women'), ('mixed');

-- create skill level enum
create table beachvolley_public.skill_level (
    type text primary key,
    description text
);
comment on table beachvolley_public.skill_level is E'@enum\nSkill level (easy, medium, hard, or a combination of them).';
grant select on table beachvolley_public.skill_level to beachvolley_graphile_anonymous, beachvolley_graphile_authenticated;
insert into beachvolley_public.skill_level (type, description) values
    ('easy', null),
    ('medium', null),
    ('hard', null),
    ('easy-medium', 'EASY or MEDIUM'),
    ('medium-hard', 'MEDIUM or HARD'),
    ('easy-hard', 'EASY or MEDIUM or HARD')
;

-- add match type field to the match
alter table beachvolley_public.match add column match_type text not null default 'mixed' references beachvolley_public.match_type;
comment on column beachvolley_public.match.match_type is 'Is the match men only, women only, or mixed. Default is mixed.';

-- add required skill level field to the match
alter table beachvolley_public.match add column required_skill_level text not null default 'easy-hard' references beachvolley_public.skill_level;
comment on column beachvolley_public.match.required_skill_level is 'Required player skill level for the match. Default is EASY_HARD.';

-- add description field to the match
alter table beachvolley_public.match add column description text;
comment on column beachvolley_public.match.description is 'Optional description of the match.';
