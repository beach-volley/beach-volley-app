const admin = require('../server/firebase-admin');
module.exports = async ({ tokens, name, link }, helpers) => {
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
    helpers.logger.info(`Hello, ${name}`);  // testihommia
  };