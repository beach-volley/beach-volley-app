const express = require("express");
const cors = require("cors");
const { postgraphile } = require("postgraphile");

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
      pgDefaultRole: "beachvolley_graphile_anonymous",
    }
  )
);

app.listen(process.env.PORT || 5000);
