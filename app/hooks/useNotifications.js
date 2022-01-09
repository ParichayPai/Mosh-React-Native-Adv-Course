import * as Notifications from "expo-notifications";
import { useEffect } from "react";

import expoPushTokens from "../api/expoPushTokens";

export default useNotifications = async (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) {
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );

      // Local Notification
      //   Notifications.scheduleNotificationAsync({
      //     content: {
      //       title: "Hello There",
      //       body: "General Kenobi",
      //     },
      //     trigger: {
      //       seconds: 2,
      //     },
      //   });
    }
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.getPermissionsAsync();
      if (!permission.granted) {
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokens.register(token);
    } catch (e) {
      console.log(e);
    }
  };
};
