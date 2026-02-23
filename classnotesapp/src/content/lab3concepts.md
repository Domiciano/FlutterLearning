[t] Laboratorio 3: Utilidades

Para desarrollar este laboratorio necesitará añadir la librería de http a su app, en el `pubspec.yml`
[code:plain]
dependencies:
  http: ^0.13.6
[endcode]

Use 
[code:bash]
flutter pub get
[endcode]
Para obtener la librería

Para un `GET` request convencional, use
[code:dart]
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> obtenerDato() async {
  final url = Uri.parse("https://www.server.com/alfa/10");

  final response = await http.get(url);

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    print(data["data"][10]["description"]);
  } else {
    print("Error en la petición");
  }
}
[endcode]
La palabra `await` sólo puede ser usada dentro de métodos `Future`.

Note que contamos con el método `jsonDecode` que convierte el `String` de respuesta en un `Map<String,dynamic>`