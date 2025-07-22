[t] Factory constructors
Un factory constructor en Dart permite devolver una instancia de la clase, pero no necesariamente una nueva. Es útil para patrones como singleton, caché, o lógica de inicialización condicional.

[st] Ejemplo de factory constructor
[code:dart]
class Logger {
  static final Logger _instance = Logger._internal();

  factory Logger() {
    return _instance;
  }

  Logger._internal();

  void log(String message) {
    print('LOG: $message');
  }
}

void main() {
  var logger1 = Logger();
  var logger2 = Logger();
  print(logger1 == logger2); // true
}
[endcode]
[trycode] f8d21d462a74cbc07647642ff564cf30

El factory constructor puede devolver una instancia existente o crear una nueva según la lógica que definas.

[st] Factory para parsear objetos
[code:dart]
class Person {
  final String name;
  final int age;

  Person({required this.name, required this.age});

  factory Person.fromJson(Map<String, dynamic> json) {
    return Person(
      name: json['nombre'],
      age: json['edad'],
    );
  }
}

void main() {
  var data = {'nombre': 'Ana', 'edad': 30};
  var person = Person.fromJson(data);
  print(person.name); // Ana
}
[endcode]
[trycode] 2ab3293d832ed38e1fc2b6afa1447689
El factory constructor es ideal para crear objetos a partir de datos externos, como JSON. 