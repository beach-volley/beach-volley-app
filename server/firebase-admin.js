const admin = require("firebase-admin");

const getFirebaseAdminPrivateKey = () => {
  if (process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    return JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
  }

  return require("../firebase-admin-private-key.json");
};

admin.initializeApp({
  credential: admin.credential.cert(getFirebaseAdminPrivateKey()),
});

module.exports = admin;
