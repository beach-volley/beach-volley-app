# Setup database

Install PostgreSQL (v12.5).

Create user and databases.

    $ sudo -u postgres psql
    # create role beachvolley_graphile login encrypted password 'dev_password';
    # create role beachvolley_graphile_superuser superuser login password 'dev_password';
    # create role beachvolley_graphile_anonymous;
    # grant beachvolley_graphile_anonymous to beachvolley_graphile;
    # create database beachvolley;
    # grant all privileges on database beachvolley to beachvolley_graphile;
    # create database beachvolley_shadow;
    # grant all privileges on database beachvolley_shadow to beachvolley_graphile;

Open connection to database when needed:

    $ psql postgres://beachvolley_graphile:dev_password@localhost:5432/beachvolley

# Development

Start front-end:

    $ npm start

Start back-end:

    $ npm run graphile

## Development with database migrations

First, start watcher `npm run migrate watch`.

Then edit `migrations/current.sql`. Every time you save that file, the watcher
updates the database schema. In addition, Graphile is watching for changes in
the database schema so it reflects these changes automatically to the API too.

When you are finished, execute `npm run migrate commit`. Then you are able to
make commit in git.

Please don't make changes to `migrations/current.sql` and commit them to git,
or at least your pull request will not be accepted. That's because everyone
uses the same file and you too want to start from an empty file and not by
reverting some scrap left behind by someone.
