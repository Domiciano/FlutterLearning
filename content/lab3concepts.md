# Laboratorio 3: Utilidades

<!-- tags: jsonDecode, Map<String, dynamic>, dato anidado, acceder a un campo dentro
     de otro, type 'List<dynamic>' is not a subtype, Null check operator used on a
     null value -->

Para desarrollar este laboratorio necesitará añadir la librería de http a su app, en el `pubspec.yml`

```plain
dependencies:
  http: ^0.13.6
```

Use 

```bash
flutter pub get
```

Para obtener la librería

Para un `GET` request convencional, use

```dart
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
```

La palabra `await` sólo puede ser usada dentro de métodos `Future`.

Note que contamos con el método `jsonDecode` que convierte el `String` de respuesta en un `Map<String,dynamic>`

## ¿Cómo se ve esa respuesta por dentro?

`jsonDecode` te devuelve, en el fondo, cajas dentro de cajas. La caja de afuera es un
`Map`: un conjunto de llaves (`String`) que apuntan a valores. Lo que hace que un JSON
sea "anidado" es que esos valores no siempre son un texto o un número — a veces son
**otra caja** (otro `Map`), o una **lista de cajas** (una `List` de `Map`).

Por ejemplo, así responde la búsqueda de canciones de Deezer que usarás en este
laboratorio:

```plain
{
  "data": [
    {
      "id": 3135556,
      "title": "Love The Way You Lie",
      "preview": "https://cdn-preview.deezer.com/....mp3",
      "artist": {
        "name": "Eminem"
      }
    },
    {
      "id": 3135557,
      "title": "Not Afraid",
      "preview": "https://cdn-preview.deezer.com/....mp3",
      "artist": {
        "name": "Eminem"
      }
    }
  ]
}
```

Léelo así: la caja de afuera solo tiene una llave que nos interesa, `"data"`, y
apunta a una **lista**. Cada elemento de esa lista es, a su vez, **otra caja**: una
canción, con sus propias llaves (`id`, `title`, `preview`...). Una de esas llaves,
`artist`, ni siquiera es un texto — es **otra caja más adentro**, con su propia
llave `name`.

Para llegar hasta el fondo, encadenas corchetes, uno por cada caja que atraviesas:

```dart
final datos = jsonDecode(response.body);

final primeraCancion = datos['data'][0];       // la primera caja de la lista
final titulo = primeraCancion['title'];        // un valor simple
final artista = primeraCancion['artist']['name']; // hay que abrir una caja más
```

O todo junto, sin variables intermedias:

```dart
final artista = datos['data'][0]['artist']['name'];
```

La regla es siempre la misma: si lo que ves entre llaves `{ }` es una caja, usas
corchetes con el nombre de la llave (`['artist']`); si es una lista `[ ]`, usas
corchetes con la posición (`[0]`). Un JSON anidado es simplemente varias de esas
cajas, una dentro de otra.
