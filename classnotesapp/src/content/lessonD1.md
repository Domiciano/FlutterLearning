[t] Estructura básica de una app Flutter
En esta lección aprenderás cómo funciona el archivo principal de una app Flutter (`main.dart`), cómo crear el widget principal de la aplicación y cómo organizar tu código en carpetas y archivos.
Vamos a borrar el contenido de ese archivos con el propósito de entender la función de cada elemento.

[st] El archivo main.dart y el método main
El archivo `main.dart` en la carpeta `lib` es el punto de entrada de toda app Flutter. El método `main()` es el primero que se ejecuta y debe llamar a `runApp()` pasando el widget principal de la app.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}
[endcode]

[list]
`runApp` recibe el widget raíz de la aplicación.
El widget raíz suele llamarse `App` y debe ser un widget especial (puede ser StatelessWidget o StatefulWidget).
[endlist]

[st] Crear el widget principal App
Crea una carpeta `src` dentro de `lib` y dentro de `src` un archivo `app.dart` (usa siempre snake_case para los nombres de archivos).

[code:dart]
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'First app',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.purple),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}
[endcode]

[list]
`MaterialApp` es el widget que configura el tema, el título y la pantalla inicial (`home`).
Usa `const` en los constructores siempre que sea posible para mejor performance.
[endlist]

[st] Crear la pantalla principal
Crea una carpeta `screens` dentro de `src` y dentro de ella un archivo `main_screen.dart` (usa snake_case).

[code:dart]
import 'package:flutter/material.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pantalla principal')),
      body: const Center(child: Text('¡Bienvenido a tu primera app Flutter!')),
    );
  }
}
[endcode]

[list]
Todos los widgets visibles en pantalla deben tener un método `build`.
Usa `Scaffold` para la estructura básica de una pantalla.
[endlist]

[st] Importar y conectar los widgets
En `app.dart`, importa el archivo de la pantalla principal

[code:dart]
import 'src/screens/main_screen.dart';
[endcode]

Asegúrate de que el widget `App` use `home: const MainScreen()`. Así, al ejecutar la app, verás la pantalla principal.
[st] Buenas prácticas
[list]
Usa snake_case para los nombres de archivos y carpetas.
Usa camelCase o PascalCase para los nombres de clases y widgets.
Aprovecha los autocompletadores de tu editor para importar archivos y clases.
Pon `const` en los constructores siempre que sea posible.
[endlist]

[st] Ejemplo completo

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'First app',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.purple),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pantalla principal')),
      body: const Center(child: Text('¡Bienvenido a tu primera app Flutter!')),
    );
  }
}
[endcode]
[trycode] d95a0b5b9c85b828c94b237be21b1bb9