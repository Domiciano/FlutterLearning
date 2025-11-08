[t] Integración completa de notificaciones con Firebase en Flutter

[st] Objetivo
En esta guía configuramos Firebase Cloud Messaging (FCM) y notificaciones locales para Android en un proyecto Flutter.
Este proceso permite:
[list]
Recibir notificaciones en foreground, background y cuando la app está cerrada.
Mostrar notificaciones locales personalizadas con `flutter_local_notifications`.
[endlist]

[st] Instalación de dependencias
Se agregaron tres nuevas dependencias en `pubspec.yaml`:
[code:yaml]
dependencies:
  firebase_core: ^4.2.1
  firebase_messaging: ^16.0.4
  flutter_local_notifications: ^19.5.0
[endcode]
Estas librerías permiten inicializar Firebase, gestionar los mensajes de FCM y mostrar notificaciones locales en Android/iOS.

[st] Configuración del proyecto Android
[st] a. Habilitar `google-services`
En `android/settings.gradle.kts`:
[code:kotlin]
plugins {
    id("com.google.gms.google-services") version("4.3.15") apply false
}
[endcode]
En `android/app/build.gradle.kts`:
[code:kotlin]
plugins {
    id("com.google.gms.google-services")
}
[endcode]
Esto permite que Gradle integre automáticamente la configuración de Firebase.

[st] b. Actualizar compatibilidad con Java y habilitar Desugaring
Se modificó la configuración de compilación para usar Java 17 y habilitar las librerías de compatibilidad modernas.
[code:kotlin]
compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
    isCoreLibraryDesugaringEnabled = true
}

kotlinOptions {
    jvmTarget = JavaVersion.VERSION_17.toString()
}
[endcode]
Se añadió además la dependencia:
[code:kotlin]
dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.4")
}
[endcode]

[st] Agregar archivo de configuración de Firebase
Se generó el archivo:
[code:text]
android/app/google-services.json
[endcode]
Con la configuración del proyecto Firebase:
[code:json]
{
  "project_info": {
    "project_number": "861116869551",
    "project_id": "flutterdomibaas",
    "storage_bucket": "flutterdomibaas.firebasestorage.app"
  },
  ...
}
[endcode]
Este archivo es único por aplicación y se obtiene desde la consola de Firebase al registrar la app Android.

[st] Archivo de opciones de Firebase
Se generó automáticamente `lib/firebase_options.dart` mediante el comando:
[code:bash]
flutterfire configure
[endcode]
Este archivo define los parámetros de conexión para Android e iOS:
[code:dart]
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);
[endcode]

[st] Inicialización de Firebase y configuración de notificaciones
En `lib/main.dart` se hicieron los siguientes pasos:
[st] a. Importar los paquetes necesarios
[code:dart]
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
[endcode]
[st] b. Inicializar Firebase y Supabase
[code:dart]
await Firebase.initializeApp();
await Supabase.initialize(
  url: 'https://yzosfzyewkdpnmlbgbej.supabase.co',
  anonKey: 'sb_publishable_sVlCTCKFQ9NktJjQTOmahw_QoBUGODX',
);
[endcode]
[st] c. Configurar notificaciones locales
[code:dart]
final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

const AndroidInitializationSettings initSettingsAndroid =
    AndroidInitializationSettings('@mipmap/ic_launcher');
const InitializationSettings initSettings =
    InitializationSettings(android: initSettingsAndroid);

await flutterLocalNotificationsPlugin.initialize(initSettings);
[endcode]

[st] Mensajes en foreground
[code:dart]
FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  print("Mensaje recibido en foreground: ${message.data}");

  flutterLocalNotificationsPlugin.show(
    id++,
    "Nuevo mensaje",
    "${message.data}",
    const NotificationDetails(
      android: AndroidNotificationDetails(
        'canal_notif',
        'Notificaciones generales',
        importance: Importance.max,
        priority: Priority.high,
      ),
    ),
  );
});
[endcode]
[st] Mensajes en background
[code:dart]
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print('Mensaje recibido en background: ${message.messageId}');
}
FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
[endcode]
[st] Cuando la app se abre desde una notificación
[code:dart]
FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
  print('Notificación abrió la app: ${message.data}');
});
[endcode]

[st] Suscripción a un topic
[code:dart]
await messaging.subscribeToTopic("mi_topic_general");
print("Suscrito al topic mi_topic_general");
[endcode]
Esto permite que el backend envíe notificaciones a todos los dispositivos suscritos a ese topic.

[st] Ejemplo de envío desde el backend
Ejemplo de payload JSON correcto para FCM:
[code:json]
{
  "message": {
    "topic": "mi_topic_general",
    "data": {
      "alfa": "Nuevo cambio"
    }
  }
}
[endcode]
El campo `data` es clave para acceder a los valores en el cliente (`message.data`).

[st] Resumen técnico
[list]
`firebase_core`: Inicializa Firebase en Flutter
`firebase_messaging`: Permite recibir mensajes push de FCM
`flutter_local_notifications`: Muestra notificaciones locales personalizadas
`google-services.json`: Configuración del proyecto Firebase
`Desugaring`: Permite compatibilidad con APIs modernas de Java 17
[endlist]

[st] Resultado final
[list]
La aplicación ahora recibe notificaciones push desde FCM.
Muestra notificaciones locales incluso en foreground.
Gestiona la suscripción a topics y el manejo de mensajes en background.
[endlist]

[st] Referencias
[link](Firebase Cloud Messaging en Flutter) https://firebase.flutter.dev/docs/messaging/overview/
[link](Notificaciones locales en Flutter) https://pub.dev/packages/flutter_local_notifications
[link](Configuración de desugaring) https://developer.android.com/studio/write/java8-support