[t] Primeros pasos con Dart
Todo programa en Dart comienza con la función `main`. Es el punto de entrada de la aplicación y donde se ejecuta el código por primera vez.

[st] ¿Cómo luce el método main?
[code:dart]
void main() {
  print('Hello, Dart!');
}
[endcode]
[trycode] 70ea035e72b031116992afc88dfb63ae
El código anterior imprime en consola el texto `Hola, Dart!`. Puedes ejecutar este programa en cualquier entorno que soporte Dart, como DartPad o tu terminal si tienes Dart instalado.

[st] Declaración de variables y tipos básicos
Dart es un lenguaje tipado, pero permite declarar variables de forma explícita o usando `var` y `dynamic`.
[code:dart]
void main() {
  int age = 25;
  double height = 1.75;
  String name = 'Ana';
  bool isStudent = true;
  var city = 'Cali'; // Type is inferred
  
  print('Name: $name');
  print('Age: $age');
  print('Height: $height');
  print('Is student: $isStudent');
  print('City: $city');
}
[endcode]
[trycode] 00838af93b7981119311449fbd221205
Usa `int` para números enteros, `double` para decimales, `String` para texto y `bool` para valores lógicos.
[list]
`var` deja que Dart infiera el tipo según el valor inicial.
`dynamic` permite cambiar el tipo de la variable, pero se recomienda solo si es necesario.
[endlist]

[st] Ejemplo práctico: main y variables
[code:dart]
void main() {
  String name = 'Ana';
  int age = 25;
  print('Hello, my name is $name and I am $age years old.');
}
[endcode]
[trycode] ae89df20a06833de993721c7223812d0