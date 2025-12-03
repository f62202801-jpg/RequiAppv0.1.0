importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyD3-xX5XhIKfI40Q9orNv2kbiPgayG9Ovc",
    authDomain: "coffee-spark-ai-barista-999a8.firebaseapp.com",
    projectId: "coffee-spark-ai-barista-999a8",
    messagingSenderId: "263257239702",
    appId: "1:263257239702:web:133a5301dab216164dd2b7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/static/icon.png"
    });
});
