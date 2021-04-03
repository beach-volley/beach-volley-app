const admin = require('../server/firebase-admin');
module.exports = async ({ tokens, name, link }) => {
    await admin.messaging().sendAll(tokens.map(token => ({
      token, notification: {
        title: `Pelaaja ${name} liittyi mukaan peliisi.`,
        body: 'Katso pelin tietoja painamalla tätä.',
      },
      webpush: {
        fcmOptions: {
          link
        }
      }
    })));
  };