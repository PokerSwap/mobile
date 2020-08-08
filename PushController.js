import PushNotification, { configure } from "react-native-push-notification";

configure({
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  senderID: "YOUR GCM (OR FCM) SENDER ID",

  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  popInitialNotification: true,
  requestPermissions: true
});

