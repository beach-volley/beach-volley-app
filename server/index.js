const express = require("express");
const cors = require("cors");
const { postgraphile } = require("postgraphile");
const admin = require('./firebase-admin');

const app = express();

const DATABASE_URL = process.env.DATABASE_URL || "postgres://beachvolley_graphile:dev_password@localhost:5432/beachvolley";
const DATABASE_ADMIN_URL = process.env.DATABASE_ADMIN_URL || "postgres://beachvolley_db_admin:dev_password@localhost:5432/beachvolley";

app.use(cors());
app.use(
  postgraphile(
    DATABASE_URL,
    "beachvolley_public",
    {
      subscriptions: true,
      watchPg: true,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      ignoreIndexes: false,
      showErrorStack: "json",
      extendedErrors: ["hint", "detail", "errcode"],
      appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
      graphiql: true,
      graphiqlRoute: "/",
      enhanceGraphiql: true,
      allowExplain: true,
      enableQueryBatching: true,
      legacyRelations: "omit",
      ownerConnectionString: DATABASE_ADMIN_URL,
      async pgSettings(req) {
        const token = (req.headers.authorization ?? '').split('Bearer ')[1];

        if (!token) {
          return {
            'role': 'beachvolley_graphile_anonymous',
          };
        }

        const decodedToken = await admin.auth().verifyIdToken(token, true);
        return {
          role: 'beachvolley_graphile_authenticated',
          'jwt.claims.firebase.uid': decodedToken.uid,
          'jwt.claims.firebase.name': decodedToken.name,
          'jwt.claims.firebase.email': decodedToken.email,
        };
      },
    }
  )
);

app.listen(process.env.PORT || 5000);
