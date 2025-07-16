[t] Condicionales

[p]
Las estructuras de control te permiten tomar decisiones en tu código. En Dart, las principales son `if`, `else` y `switch`.

[st] Estructura if básica

[c:dart]
void main() {
  int age = 18;
  
  if (age >= 18) {
    print('You are an adult');
  }
  
  // if with else
  if (age >= 18) {
    print('You are an adult');
  } else {
    print('You are a minor');
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
  int grade = 85;
  
  if (grade >= 90) {
    print('Excellent');
  } else if (grade >= 80) {
    print('Very good');
  } else if (grade >= 70) {
    print('Good');
  } else if (grade >= 60) {
    print('Passed');
  } else {
    print('Failed');
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
  int age = 25;
  bool hasLicense = true;
  
  // AND (&&)
  if (age >= 18 && hasLicense) {
    print('You can drive');
  }
  
  // OR (||)
  if (age < 18 || !hasLicense) {
    print('You cannot drive');
  }
  
  // NOT (!)
  if (!hasLicense) {
    print('You need to get a license');
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
  String day = 'Monday';
  
  switch (day) {
    case 'Monday':
      print('Start of the week');
      break;
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
      print('Workday');
      break;
    case 'Friday':
      print('Friday!');
      break;
    case 'Saturday':
    case 'Sunday':
      print('Weekend');
      break;
    default:
      print('Invalid day');
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
  int number = 5;
  
  String result = switch (number) {
    1 => 'One',
    2 => 'Two',
    3 => 'Three',
    _ => 'Other number'
  };
  
  print(result); // Other number
}
[end]
[trycode] de38d5d1ed991997ce2fef292fb3e57b

[p]
El switch con expresiones es más conciso y devuelve un valor.

[p]
El `_` es el caso por defecto en switch expressions.

