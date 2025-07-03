[t] Operadores numéricos

[p]
Los operadores te permiten realizar cálculos y comparaciones con variables numéricas en Dart. Vamos a ver los más importantes.

[st] Operadores aritméticos básicos

[c:dart]
void main() {
  int a = 10;
  int b = 3;
  
  print(a + b);  // Suma: 13
  print(a - b);  // Resta: 7
  print(a * b);  // Multiplicación: 30
  print(a / b);  // División: 3.333...
  print(a % b);  // Módulo (resto): 1
  print(a ~/ b); // División entera: 3
}
[end]
[trycode] 0b724266b8c3b41729324393b1770bf3

[p]
`+` suma, `-` resta, `*` multiplica, `/` divide (resultado decimal)

[p]
`%` obtiene el resto de la división

[p]
`~/` divide y devuelve solo la parte entera

[st] Operadores de asignación

[c:dart]
void main() {
  int x = 5;
  x += 3;  // Equivale a: x = x + 3
  print(x); // 8
  
  x *= 2;  // Equivale a: x = x * 2
  print(x); // 16
}
[end]
[trycode] e6c00b23687660a44f959f591dff34a4

[p]
Los operadores `+=`, `-=`, `*=`, `/=` son atajos para modificar una variable.

[st] Operadores de comparación

[c:dart]
void main() {
  int edad = 18;
  
  print(edad > 16);   // Mayor que: true
  print(edad < 21);   // Menor que: true
  print(edad >= 18);  // Mayor o igual: true
  print(edad <= 20);  // Menor o igual: true
  print(edad == 18);  // Igual: true
  print(edad != 20);  // Diferente: true
}
[end]
[trycode] a501a06d10cb1e0a852d138191943569

[p]
Estos operadores devuelven `true` o `false` y son fundamentales para las estructuras de control.

[st] Operadores de incremento y decremento

[c:dart]
void main() {
  int contador = 5;
  
  contador++;  // Incrementa en 1
  print(contador); // 6
  
  contador--;  // Decrementa en 1
  print(contador); // 5
}
[end]
[trycode] 9d90271cdc58be19cac8482d9581e22a





