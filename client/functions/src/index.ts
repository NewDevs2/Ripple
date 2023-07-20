import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// 푸시 알림 보내기 함수
exports.sendPushNotification = functions.firestore
  .document("notifications/{notificationId}")
  .onCreate(async (snapshot: any, context: any) => {
    const notificationData = snapshot.data();
    const notificationTitle = notificationData.title;
    const notificationBody = notificationData.body;
    const token = notificationData.token;

    const message = {
      data: {
        title: notificationTitle,
        body: notificationBody,
      },
      token: token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("푸시 알림이 성공적으로 보내졌습니다:", response);
    } catch (error) {
      console.error("푸시 알림 보내기 오류:", error);
    }
  });
