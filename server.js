const express = require("express");
const cors = require("cors");
const { postgraphile } = require("postgraphile");
const admin = require("firebase-admin");
const firebaseAdminPrivateKey = require("./firebase-admin-private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminPrivateKey),
});

const app = express();

app.use(cors());
app.use(
  postgraphile(
    process.env.DATABASE_URL ||
      "postgres://beachvolley_graphile:dev_password@localhost:5432/beachvolley",
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
      exportGqlSchemaPath: "data/schema.graphql",
      graphiql: true,
      graphiqlRoute: "/",
      enhanceGraphiql: true,
      allowExplain: true,
      enableQueryBatching: true,
      legacyRelations: "omit",
      ownerConnectionString:
        "postgres://beachvolley_graphile_superuser:dev_password@localhost:5432/beachvolley",
      async pgSettings(req) {
        const token = (req.headers.authorization ?? '').split('Bearer ')[1];

        if (!token) {
          return {
            'role': 'beachvolley_graphile_anonymous',
          };
        }

        const decodedToken = await admin.auth().verifyIdToken(token, true);
        return {
          role: 'beachvolley_graphile',
          'jwt.claims.firebase.uid': decodedToken.uid,
          'jwt.claims.firebase.name': decodedToken.name,
          'jwt.claims.firebase.email': decodedToken.email,
        };
      },
    }
  )
);

app.listen(process.env.PORT || 5000);
