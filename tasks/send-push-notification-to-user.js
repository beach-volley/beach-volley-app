const admin = require("../server/firebase-admin");

module.exports = async ({ tokens, title, message, link }) => {
  if (tokens.length > 0) {
    await admin.messaging().sendAll(
      tokens.map((token) => ({
        token,
        notification: {
          title,
          body: message,
          imageUrl: "/logo512.png",
        },
        webpush: {
          fcmOptions: {
            link,
          },
        },
      }))
    );
  }
};
