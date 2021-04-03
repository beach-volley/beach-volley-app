const admin = require("../server/firebase-admin");

module.exports = async ({ tokens, name, link }) => {
  await admin.messaging().sendAll(
    tokens.map((token) => ({
      token,
      notification: {
        title: `${name} kutsui sinut mukaan pelaamaan.`,
        body: "Tarkastele kutsua napsauttamalla.",
      },
      webpush: {
        fcmOptions: {
          link,
        },
      },
    }))
  );
};
