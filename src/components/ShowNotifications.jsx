import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase";

const ShowNotifications = () => {
  const [permission, setPermission] = useState(
    Notification?.permission ?? "denied"
  );

  const messaging = firebase.messaging();
  messaging.onMessage((payload) => {
    // todo: show notification somehow in the UI
    console.log("message received", payload);
  });

  useEffect(() => {
    if (permission === "granted") {
      messaging
        .getToken({ vapidKey: process.env.VAPID_KEY })
        .then((currentToken) => {
          // todo: send token to server
          console.log("token", currentToken);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [permission, messaging]);

  const askPermission = useCallback(async () => {
    setPermission(await Notification.requestPermission());
  }, [setPermission]);

  if (permission === "denied") {
    return null;
  }

  return (
    <button onClick={askPermission}>
      Pelikutsut {permission === "granted" ? "päällä" : "pois päältä"}
    </button>
  );
};

export default ShowNotifications;
