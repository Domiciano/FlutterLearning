[t] Operadores numéricos
Los operadores te permiten realizar cálculos y comparaciones con variables numéricas en Dart. Vamos a ver los más importantes.

[st] Operadores aritméticos básicos
[code:dart]
void main() {
  int a = 10;
  int b = 3;
  
  print(a + b);  // Sum: 13
  print(a - b);  // Subtraction: 7
  print(a * b);  // Multiplication: 30
  print(a / b);  // Division: 3.333...
  print(a % b);  // Modulo (remainder): 1
  print(a ~/ b); // Integer division: 3
}
[endcode]
[trycode] 0b724266b8c3b41729324393b1770bf3
`+` suma, `-` resta, `*` multiplica, `/` divide (resultado decimal)

`%` obtiene el resto de la división

`~/` divide y devuelve solo la parte entera

[st] Operadores de asignación
[code:dart]
void main() {
  int x = 5;
  x += 3;  // Equivalent to: x = x + 3
  print(x); // 8
  
  x *= 2;  // Equivalent to: x = x * 2
  print(x); // 16
}
[endcode]
[trycode] e6c00b23687660a44f959f591dff34a4
Los operadores `+=`, `-=`, `*=`, `/=` son atajos para modificar una variable.

[st] Operadores de comparación
[code:dart]
void main() {
  int age = 18;
  
  print(age > 16);   // Greater than: true
  print(age < 21);   // Less than: true
  print(age >= 18);  // Greater or equal: true
  print(age <= 20);  // Less or equal: true
  print(age == 18);  // Equal: true
  print(age != 20);  // Not equal: true
}
[endcode]
[trycode] a501a06d10cb1e0a852d138191943569
Estos operadores devuelven `true` o `false` y son fundamentales para las estructuras de control.

[st] Operadores de incremento y decremento
[code:dart]
void main() {
  int counter = 5;
  
  counter++;  // Increments by 1
  print(counter); // 6
  
  counter--;  // Decrements by 1
  print(counter); // 5
}
[endcode]
[trycode] 9d90271cdc58be19cac8482d9581e22a