import { take, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import messaging from '@react-native-firebase/messaging';

import { PUSH_NOTIFICATION_HANDLE } from '~/modules/pushNotifications/actions';
import { NotificationHandleType } from '../constants';

const createNotificationListener = () =>
  eventChannel((emitter) => {
    const onMessage = messaging().onMessage((n) =>
      emitter({
        type: NotificationHandleType.ON_MESSAGE,
        notification: n,
      }),
    );
    const notificationOpenedAppListener = messaging().onNotificationOpenedApp(
      (n) =>
        emitter({
          type: NotificationHandleType.NOTIFICATION_ON_OPENED_APP,
          notification: n,
        }),
    );
    function removeListeners() {
      onMessage();
      notificationOpenedAppListener();
    }

    return removeListeners;
  });

export default function* watchPushNotificationOnReceiveSaga() {
  console.log('start watching watchPushNotificationOnReceiveSaga');

  const NotificationListener = yield call(createNotificationListener);

  try {
    while (true) {
      const notification = yield take(NotificationListener);
      yield put(PUSH_NOTIFICATION_HANDLE.RECEIVED.create(notification));
    }
  } finally {
    NotificationListener.close();
  }
}
