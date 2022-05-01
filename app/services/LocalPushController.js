import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const GetChannels = () => {
  PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids); // ['channel_id_1']
  });
};

export const DeleteChannel = () => {
  PushNotification.deleteChannel('channel-id');
};

export const CreateChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const LocalNotification = (
  finalStartTime,
  seconds,
  currentTimeGreater,
) => {
  console.log('currentTimeGreater: ', currentTimeGreater);
  currentTimeGreater
    ? PushNotification.localNotificationSchedule({
        allowWhileIdle: true,
        visibility: 'public',
        priority: 'max',
        channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        autoCancel: true,
        bigText:
          'Keep your day productive, increase energy and relieve fatigue. Reach your goals one glass of water at a time.',
        subText: 'Showtime',
        title: 'Stay Hydrated',
        message: 'Unlock your true potential',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        //  actions: '["Yes", "No"]',
        repeatType: 'time',
        repeatTime: seconds,
        date: new Date(Date.now() + seconds), // current time larger
      })
    : PushNotification.localNotificationSchedule({
        allowWhileIdle: true,
        visibility: 'public',
        priority: 'max',
        channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        autoCancel: true,
        bigText:
          'Keep your day productive, increase energy and relieve fatigue. Reach your goals one glass of water at a time.',
        subText: 'Showtime',
        title: 'Stay Hydrated',
        message: 'Unlock your true potential',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        // actions: '["Yes", "No"]',
        repeatType: 'time',
        repeatTime: seconds,
        date: new Date(finalStartTime), // current time smaller
      });
};
