[t] Constructores

[p]
En Dart, los constructores permiten inicializar los objetos de una clase. Puedes definir constructores con parámetros posicionales o nombrados, y usar la palabra `required` para obligar a que se pasen ciertos valores al crear una instancia.

[st] Constructor básico y uso de final

[c:dart]
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);
}

void main() {
  var person = Person('Ana', 30);
  print(person.name); // Ana
}
[end]
[trycode] 1d4a3fe97b9141abd8f292c68644d573

[p]
La palabra `final` indica que el valor solo puede ser asignado una vez, normalmente en el constructor.

[st] Parámetros nombrados y required

[c:dart]
class Person {
  final String name;
  final int age;

  Person({required this.name, required this.age});
}

void main() {
  var person = Person(name: 'Luis', age: 25);
  print(person.name); // Luis
}
[end]
[trycode] e0a448441e7b821d4bcd7cbba36d037b

[p]
Los parámetros nombrados (entre `{}`) permiten mayor claridad y flexibilidad al crear objetos. La palabra `required` obliga a que se pasen esos valores.

[st] Parámetros opcionales y valores por defecto

[c:dart]
class Person {
  final String name;
  final int age;

  Person({required this.name, this.age = 18});
}

void main() {
  var person = Person(name: 'Sofía');
  print(person.age); // 18
}
[end]
[trycode] f3d26c9e77675dbf1c2e654b759cf8ad

[p]
Si no usas `{}`, los parámetros son posicionales y deben pasarse en orden. Si usas `{}`, puedes pasarlos en cualquier orden y hacerlos opcionales o requeridos. 