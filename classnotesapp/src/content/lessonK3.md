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

[st] Android · Habilitar `google-services`
En el archivo `android/app/build.gradle.kts`
[code:kotlin]
plugins {
  id("com.google.gms.google-services")
}
compileOptions {
  sourceCompatibility = JavaVersion.VERSION_17
  targetCompatibility = JavaVersion.VERSION_17
  isCoreLibraryDesugaringEnabled = true
}

kotlinOptions {
  jvmTarget = JavaVersion.VERSION_17.toString()
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.4")
}
[endcode]
Esto permite que Gradle integre la configuración de Firebase y use los servicios de Google

[st] Inicialización de Firebase y configuración de notificaciones
En `lib/main.dart` se hicieron los siguientes pasos:
[st] Importar los paquetes necesarios
[code:dart]
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
[endcode]

[st] Configurar notificaciones locales
En la raíz del proyecto
[code:dart]
final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();
[endcode]
Esto permite generar notificaciones visuales

[st] Inicialización de la aplicación
En el archivo main.dart debemos inicializar la recepción asincrónica de mensajes. El orden de las líneas importa, de modo que aquí tiene la forma general del archivo 
[code:dart]
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp();

  // Anclar un método de recepción de mensajes
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  // Configura canal local de Android
  const AndroidInitializationSettings initSettingsAndroid =
      AndroidInitializationSettings('@mipmap/ic_launcher');
  const InitializationSettings initSettings =
      InitializationSettings(android: initSettingsAndroid);
  await flutterLocalNotificationsPlugin.initialize(initSettings);

  await Supabase.initialize(
    url: 'https://yzosfzyewkdpnmlbgbej.supabase.co',
    anonKey: 'sb_publishable_sVlCTCKFQ9NktJjQTOmahw_QoBUGODX',
  );

  runApp(const App());
}
[endcode]

[st] Método de rececpción 
En la inicialización usamos `_firebaseMessagingBackgroundHandler`, la definición de ese método es
[code:dart]
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print('Mensaje recibido en background: ${message.messageId}');
}
[endcode]

[st] Suscripción
El Widget `App` debe ser un StatefulWidget para que haya método de inicialización `initState` y poder activar la recepción
[code:dart]
class App extends StatefulWidget{
  const App({super.key});

  @override
  State<StatefulWidget> createState() {
    return MyAppState();
  }
  
}

class MyAppState extends State<App> {
  @override
  void initState() {
    super.initState();
    //Vamos a suscribirnos aquí
  }
}
[endcode]

Ahora sí, en el método `initState` de la aplicación
[code:dart]
@override
void initState() {
  super.initState();
  //Vamos a suscribirnos aquí
  _initNotifications();
}

Future<void> _initNotifications() async {
    FirebaseMessaging messaging = FirebaseMessaging.instance;

    // Solicita permisos para notificaciones
    NotificationSettings settings = await messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    print('Permisos otorgados: ${settings.authorizationStatus}');

    // Suscripción al topic
    await messaging.subscribeToTopic("mi_topic_general");
    print("Suscrito al topic mi_topic_general");

    // Escuchar mensajes entrantes
    FirebaseMessaging.onMessage.listen(
      (RemoteMessage message) {
        print("Mensaje recibido en foreground: ${message.data}");
      }
    );
}
[endcode]
Dentro del listener se imprimen los mensajes que llegan, pero como queremos mostrarlos como notificación, podemos usar este objeto message la siguiente forma.
[code:dart]
RemoteNotification? notification = message.notification;
AndroidNotification? android = message.notification?.android;
flutterLocalNotificationsPlugin.show(
  id++,
  "Nuevo mensaje",
  "${message.data}",
  const NotificationDetails(
    android: AndroidNotificationDetails(
      'canal_notif', // ID único del canal
      'Notificaciones generales',
      importance: Importance.max,
      priority: Priority.high,
    ),
  ),
);
[endcode]
Con esto ya está suscrito al topic mi_topic_general.