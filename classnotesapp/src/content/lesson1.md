[t] Primeros pasos con Dart

[p]
Todo programa en Dart comienza con la función `main`. Es el punto de entrada de la aplicación y donde se ejecuta el código por primera vez.

[st] ¿Cómo luce el método main?

[c:dart]
void main() {
  print('Hola, Dart!');
}
[end]
[trycode] 70ea035e72b031116992afc88dfb63ae

[p]
El código anterior imprime en consola el texto `Hola, Dart!`. Puedes ejecutar este programa en cualquier entorno que soporte Dart, como DartPad o tu terminal si tienes Dart instalado.

[st] Declaración de variables y tipos básicos

[p]
Dart es un lenguaje tipado, pero permite declarar variables de forma explícita o usando `var` y `dynamic`.

[c:dart]
void main() {
  int edad = 25;
  double altura = 1.75;
  String nombre = 'Ana';
  bool esEstudiante = true;
  var ciudad = 'Cali'; // El tipo se infiere
  
  print('Nombre: $nombre');
  print('Edad: $edad');
  print('Altura: $altura');
  print('Es estudiante: $esEstudiante');
  print('Ciudad: $ciudad');
}
[end]
[trycode] 00838af93b7981119311449fbd221205

[p]
Usa `int` para números enteros, `double` para decimales, `String` para texto y `bool` para valores lógicos.

[p]
`var` deja que Dart infiera el tipo según el valor inicial.

[p]
`dynamic` permite cambiar el tipo de la variable, pero se recomienda solo si es necesario.

[st] Ejemplo práctico: main y variables

[c:dart]
void main() {
  String nombre = 'Ana';
  int edad = 25;
  print('Hola, mi nombre es $nombre y tengo $edad años.');
}
[end]
[trycode] ae89df20a06833de993721c7223812d0