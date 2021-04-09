import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyBRelhF9kWyV9cI4kvFiQYBDu7HNBR-5_U",
  authDomain: "beach-volley-app.firebaseapp.com",
  projectId: "beach-volley-app",
  storageBucket: "beach-volley-app.appspot.com",
  messagingSenderId: "758236414363",
  appId: "1:758236414363:web:ec60a0c0299c837704213e",
});

export const auth = app.auth();

export const messaging = (() => {
  // ignore error if browser does not support messaging
  try {
    return app.messaging();
  } catch (e) {
    console.error(e);
    return undefined;
  }
})();

export const GoogleID = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
