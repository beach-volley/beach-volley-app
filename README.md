# Setup database

Install PostgreSQL (v12.5). In linux run `sudo apt-get install postgresql` and
in Windows download installer from
[the Official site](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

Create needed users and databases. Open psql as an superuser. In Linux run
`sudo -u postgres psql` and in Windows open "SQL Shell (psql)" from Windows
menu. Then in the shell run following commands.

_Remember `;` at the end of every line. If you miss it and hit enter, type it to
next line and then hit enter again. To skip problems, consider copying and
pasting the commands. The shell responds something like `CREATE ROLE` when the
command has been executed successfully._

    # create role beachvolley_graphile login encrypted password 'dev_password';
    # create role beachvolley_graphile_superuser superuser login password 'dev_password';
    # create role beachvolley_graphile_anonymous;
    # grant beachvolley_graphile_anonymous to beachvolley_graphile;
    # create database beachvolley;
    # grant all privileges on database beachvolley to beachvolley_graphile;
    # create database beachvolley_shadow;
    # grant all privileges on database beachvolley_shadow to beachvolley_graphile;

# Development

For the first time (and later occasionally) run the following commands:

    $ npm install
    $ npm run migrations -- reset --erase

Start front-end:

    $ npm start

Start back-end:

    $ npm run migrations migrate
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
