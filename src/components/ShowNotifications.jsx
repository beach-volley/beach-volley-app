import React, { useCallback, useEffect, useState } from "react";
import { messaging } from "../utils/firebase";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FCM_TOKEN, CURRENT_USER } from "../queries";

const ShowNotifications = () => {
  const [permission, setPermission] = useState(
    Notification?.permission ?? "denied"
  );
  const [addFcmToken] = useMutation(ADD_FCM_TOKEN);
  const currentUser = useQuery(CURRENT_USER);

  messaging?.onMessage((payload) => {
    // todo: show notification somehow in the UI
    console.log("message received", payload);
  });

  useEffect(() => {
    if (permission === "granted" && currentUser.data?.currentUser) {
      messaging
        ?.getToken({ vapidKey: process.env.VAPID_KEY })
        .then((token) => addFcmToken({ variables: { token } }))
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [permission, addFcmToken, currentUser]);

  const askPermission = useCallback(async () => {
    setPermission(await Notification.requestPermission());
  }, [setPermission]);

  if (permission === "denied" || !messaging) {
    return null;
  }

  return (
    <button onClick={askPermission}>
      Pelikutsut {permission === "granted" ? "päällä" : "pois päältä"}
    </button>
  );
};

export default ShowNotifications;
