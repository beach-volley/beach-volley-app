// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBRelhF9kWyV9cI4kvFiQYBDu7HNBR-5_U",
  authDomain: "beach-volley-app.firebaseapp.com",
  projectId: "beach-volley-app",
  storageBucket: "beach-volley-app.appspot.com",
  messagingSenderId: "758236414363",
  appId: "1:758236414363:web:ec60a0c0299c837704213e",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
