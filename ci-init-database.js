const { promises: fsp } = require("fs");
const pg = require("pg");

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  try {
    await pool.query("create role beachvolley_graphile login encrypted password 'dev_password';");
    await pool.query("create role beachvolley_graphile_anonymous;");
    await pool.query("grant beachvolley_graphile_anonymous to beachvolley_graphile;");
    await pool.query("grant all privileges on database beachvolley to beachvolley_graphile;");
    console.log("Database initialised");
  } finally {
    pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
