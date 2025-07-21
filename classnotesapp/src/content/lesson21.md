[t] Images
En esta lección aprenderás cómo agregar y mostrar imágenes en Flutter, tanto desde archivos locales (assets) como desde internet.

[st] Agregar imágenes desde assets
Para usar imágenes locales en tu app Flutter:
[list]
1. Abre el archivo `pubspec.yaml` y busca la clave `flutter:` (no la de dependencias).
2. Agrega la sección `assets:` e indica la carpeta donde pondrás tus imágenes, por ejemplo:
[endlist]
[code:yaml]
flutter:
  assets:
    - assets/
[endcode]

[list]
3. Crea una carpeta llamada `assets` en la raíz del proyecto y coloca allí tus imágenes (por ejemplo, `logo.png`).
4. Ejecuta `flutter pub get` para sincronizar los assets.
[endlist]

[st] Mostrar una imagen local
Puedes mostrar una imagen de assets usando `Image.asset`:
[code:dart]
Image.asset(
  'assets/logo.png',
  width: 200,
  height: 100,
)
[endcode]


[st] Mostrar una imagen desde internet
También puedes mostrar imágenes externas usando `Image.network`:
[code:dart]
Image.network(
  'https://flutter.dev/images/flutter-logo-sharing.png',
  width: 300,
)
[endcode]


[st] Ejemplo completo: imagen centrada en pantalla

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Imágenes en Flutter')),
        body: Center(
          child: Image.network(
                'https://yt3.googleusercontent.com/2__G-ckA66-4JgXPlHTGZvg8CoUIgDU6qYFnJqW-AsVeJvBRT4hCjXz4XMOjIqm4m7v431lT=s900-c-k-c0x00ffffff-no-rj',
                width: 300,
            ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 77bf8c979cb62c41f0ff9e29f754ce10

[list]
Usa `Image.asset` para imágenes locales y `Image.network` para imágenes externas.
Recuerda registrar la carpeta de assets en `pubspec.yaml`.
Puedes controlar el tamaño de la imagen con las propiedades `width` y `height`.
Las imágenes pueden ser parte de cualquier layout usando `Container`, `Row`, `Column`, etc.
[endlist]

