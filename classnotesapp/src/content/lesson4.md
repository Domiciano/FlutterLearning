[t] Condicionales

[p]
Las estructuras de control te permiten tomar decisiones en tu código. En Dart, las principales son `if`, `else` y `switch`.

[st] Estructura if básica

[c:dart]
void main() {
  int edad = 18;
  
  if (edad >= 18) {
    print('Eres mayor de edad');
  }
  
  // if con else
  if (edad >= 18) {
    print('Eres mayor de edad');
  } else {
    print('Eres menor de edad');
  }
}
[end]
[trycode] 56fccc30e3b1cff9300b6df7b413f012

[p]
El `if` evalúa una condición y ejecuta el código si es verdadera.

[p]
El `else` ejecuta código alternativo cuando la condición es falsa.

[st] if-else if-else

[c:dart]
void main() {
  int nota = 85;
  
  if (nota >= 90) {
    print('Excelente');
  } else if (nota >= 80) {
    print('Muy bien');
  } else if (nota >= 70) {
    print('Bien');
  } else if (nota >= 60) {
    print('Aprobado');
  } else {
    print('Reprobado');
  }
}
[end]
[trycode] 0b3b037f5ba9cb2d0dcc6143a32183f6

[p]
Usa `else if` para evaluar múltiples condiciones en orden.

[p]
Solo se ejecuta el primer bloque cuya condición sea verdadera.

[st] Operadores lógicos

[c:dart]
void main() {
  int edad = 25;
  bool tieneLicencia = true;
  
  // AND (&&)
  if (edad >= 18 && tieneLicencia) {
    print('Puedes conducir');
  }
  
  // OR (||)
  if (edad < 18 || !tieneLicencia) {
    print('No puedes conducir');
  }
  
  // NOT (!)
  if (!tieneLicencia) {
    print('Necesitas obtener una licencia');
  }
}
[end]
[trycode] 2f601504e024daf02cca4f7fc7d37e48

[p]
`&&` (AND): ambas condiciones deben ser verdaderas.

[p]
`||` (OR): al menos una condición debe ser verdadera.

[p]
`!` (NOT): invierte el valor booleano.

[st] Estructura switch

[c:dart]
void main() {
  String dia = 'lunes';
  
  switch (dia) {
    case 'lunes':
      print('Inicio de semana');
      break;
    case 'martes':
    case 'miércoles':
    case 'jueves':
      print('Día laboral');
      break;
    case 'viernes':
      print('¡Viernes!');
      break;
    case 'sábado':
    case 'domingo':
      print('Fin de semana');
      break;
    default:
      print('Día no válido');
  }
}
[end]
[trycode] ed8a90a9d9800d1aa15f421b3558450c

[p]
El `switch` evalúa una variable contra múltiples valores.

[p]
Usa `break` para salir del switch después de cada caso.

[p]
El `default` se ejecuta si ningún caso coincide.

[st] Switch con expresiones (Dart 3.0+)

[c:dart]
void main() {
  int numero = 5;
  
  String resultado = switch (numero) {
    1 => 'Uno',
    2 => 'Dos',
    3 => 'Tres',
    _ => 'Otro número'
  };
  
  print(resultado); // Otro número
}
[end]
[trycode] de38d5d1ed991997ce2fef292fb3e57b

[p]
El switch con expresiones es más conciso y devuelve un valor.

[p]
El `_` es el caso por defecto en switch expressions.

