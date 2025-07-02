[t] Operadores Básicos en Dart

[st] Introducción a los operadores

[p]
Los operadores en Dart son símbolos especiales que realizan operaciones específicas en operandos. Dart soporta una amplia variedad de operadores que se pueden clasificar en diferentes categorías según su funcionalidad.

[st] Operadores Aritméticos

[p]
Los operadores aritméticos se utilizan para realizar operaciones matemáticas básicas:

[c:dart]
void main() {
  int a = 10;
  int b = 3;
  
  print('Suma: ${a + b}');        // 13
  print('Resta: ${a - b}');       // 7
  print('Multiplicación: ${a * b}'); // 30
  print('División: ${a / b}');    // 3.333...
  print('División entera: ${a ~/ b}'); // 3
  print('Módulo: ${a % b}');      // 1
  print('Potencia: ${a * a}');    // 100
}
[end]

[st] Operadores de Asignación Operadores de Asignación

[p]
Los operadores de asignación se utilizan para asignar valores a variables:

[c:dart]
void main() {
  int x = 10;
  
  x += 5;  // Equivale a: x = x + 5
  print('x += 5: $x'); // 15
  
  x -= 3;  // Equivale a: x = x - 3
  print('x -= 3: $x'); // 12
  
  x *= 2;  // Equivale a: x = x * 2
  print('x *= 2: $x'); // 24
  
  x /= 4;  // Equivale a: x = x / 4
  print('x /= 4: $x'); // 6.0
}
[end]

[st] Operadores de Comparación

[p]
Los operadores de comparación se utilizan para comparar valores y devuelven un resultado booleano:

[c:dart]
void main() {
  int a = 10;
  int b = 5;
  
  print('a == b: ${a == b}');  // false
  print('a != b: ${a != b}');  // true
  print('a > b: ${a > b}');    // true
  print('a < b: ${a < b}');    // false
  print('a >= b: ${a >= b}');  // true
  print('a <= b: ${a <= b}');  // false
}
[end]

[st] Operadores Lógicos

[p]
Los operadores lógicos se utilizan para combinar condiciones y realizar operaciones lógicas:

[c:dart]
void main() {
  bool a = true;
  bool b = false;
  
  print('a && b: ${a && b}');  // false (AND)
  print('a || b: ${a || b}');  // true (OR)
  print('!a: ${!a}');          // false (NOT)
  
  // Operador de cortocircuito
  bool result = a && (b || true);
  print('Resultado: $result'); // true
}
[end]

[st] Operadores de Incremento y Decremento 

[p]
Dart proporciona operadores especiales para incrementar y decrementar valores:

[c:dart]
void main() {
  int x = 5;
  
  // Incremento
  print('x: $x');      // 5
  print('++x: ${++x}'); // 6 (pre-incremento)
  print('x++: ${x++}'); // 6 (post-incremento)
  print('x: $x');      // 7
  
  // Decremento
  print('--x: ${--x}'); // 6 (pre-decremento)
  print('x--: ${x--}'); // 6 (post-decremento)
  print('x: $x');      // 5
}
[end]

[st] Operadores de Igualdad y Identidad

[p]
Dart distingue entre igualdad de valores e identidad de objetos:

[c:dart]
void main() {
  String str1 = 'Hola';
  String str2 = 'Hola';
  String str3 = str1;
  
  // Igualdad de valores
  print('str1 == str2: ${str1 == str2}'); // true
  
  // Identidad de objetos
  print('str1 == str3: ${str1 == str3}'); // true
  print('identical(str1, str2): ${identical(str1, str2)}'); // true (string interning)
  
  // Con objetos personalizados
  var obj1 = Object();
  var obj2 = Object();
  print('obj1 == obj2: ${obj1 == obj2}'); // false
}
[end]

[st] Operadores de Acceso y Llamada

[p]
Los operadores de acceso se utilizan para acceder a propiedades y métodos de objetos:

[c:dart]
class Persona {
  String nombre;
  int edad;
  
  Persona(this.nombre, this.edad);
  
  void saludar() {
    print('Hola, soy $nombre');
  }
}

void main() {
  var persona = Persona('Ana', 25);
  
  // Acceso a propiedades
  print('Nombre: ${persona.nombre}');
  print('Edad: ${persona.edad}');
  
  // Llamada a métodos
  persona.saludar();
  
  // Operador de acceso condicional
  Persona? persona2 = null;
  print('Edad: ${persona2?.edad}'); // null (no causa error)
}
[end]

[st] Operadores de Nivel de Bits

[p]
Los operadores de nivel de bits se utilizan para manipular bits individuales:

[c:dart]
void main() {
  int a = 5;  // 0101 en binario
  int b = 3;  // 0011 en binario
  
  print('a & b: ${a & b}');   // 1 (AND bit a bit)
  print('a | b: ${a | b}');   // 7 (OR bit a bit)
  print('a ^ b: ${a ^ b}');   // 6 (XOR bit a bit)
  print('~a: ${~a}');         // -6 (NOT bit a bit)
  print('a << 1: ${a << 1}'); // 10 (desplazamiento izquierda)
  print('a >> 1: ${a >> 1}'); // 2 (desplazamiento derecha)
}
[end]

[st] Precedencia de Operadores

[p]
Es importante entender la precedencia de operadores para escribir expresiones correctas:

[c:dart]
void main() {
  int a = 2;
  int b = 3;
  int c = 4;
  
  // Sin paréntesis (precedencia natural)
  int resultado1 = a + b * c;
  print('a + b * c = $resultado1'); // 14 (3 * 4 + 2)
  
  // Con paréntesis (forzar precedencia)
  int resultado2 = (a + b) * c;
  print('(a + b) * c = $resultado2'); // 20 ((2 + 3) * 4)
  
  // Operadores de comparación
  bool comparacion = a < b && b < c;
  print('a < b && b < c: $comparacion'); // true
}
[end]

[st] Operadores de Asignación Condicional

[p]
Dart proporciona operadores de asignación condicional para simplificar el código:

[c:dart]
void main() {
  String? nombre;
  String? apellido = 'García';
  
  // Operador ?? (null coalescing)
  String nombreCompleto = nombre ?? 'Anónimo';
  print('Nombre: $nombreCompleto'); // Anónimo
  
  // Operador ??= (asignación null-aware)
  nombre ??= 'Juan';
  print('Nombre después: $nombre'); // Juan
  
  // Operador ?. (acceso null-aware)
  String? texto = null;
  print('Longitud: ${texto?.length}'); // null
  
  // Operador ?? con múltiples opciones
  String valor = nombre ?? apellido ?? 'Sin nombre';
  print('Valor final: $valor'); // Juan
}
[end]

[st] Resumen y Mejores Prácticas

[p]
Los operadores en Dart son herramientas poderosas que te permiten escribir código más expresivo y eficiente. Recuerda:

- Usar paréntesis para clarificar la precedencia de operadores
- Preferir operadores de asignación compuesta para código más limpio
- Utilizar operadores null-aware para manejar valores nulos de forma segura
- Comprender la diferencia entre igualdad (==) e identidad (identical)
- Usar operadores de cortocircuito para optimizar evaluaciones condicionales

[c:dart]
// Ejemplo de buenas prácticas
void main() {
  int? edad;
  String nombre = 'Ana';
  
  // Uso correcto de operadores
  if (edad != null && edad >= 18) {
    print('$nombre es mayor de edad');
  }
  
  // Operador null-aware
  String mensaje = 'Edad: ${edad ?? 'No especificada'}';
  print(mensaje);
  
  // Operador de asignación compuesta
  int contador = 0;
  contador += 1; // Más claro que contador = contador + 1
}
[end]

