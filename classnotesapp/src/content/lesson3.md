[t] Trabajando con Strings

[p]
Los strings en Dart son secuencias de caracteres que puedes manipular de varias formas. Vamos a ver las más comunes: concatenación e interpolación.

[st] Concatenación de strings

[c:dart]
void main() {
  String firstName = 'Ana';
  String lastName = 'García';
  
  // Concatenation with +
  String fullName = firstName + ' ' + lastName;
  print(fullName); // Ana García
  
  // Concatenation with +
  String greeting = 'Hello ' + firstName;
  print(greeting); // Hello Ana
}
[end]
[trycode] 9ea5113dcc307145e4f26950b3770012

[p]
La concatenación con `+` es la forma más simple de unir strings.

[p]
También puedes usar interpolación para unir strings.

[st] Interpolación de strings

[c:dart]
void main() {
  String name = 'Carlos';
  int age = 25;
  
  // Simple interpolation with $
  String message = 'Hello, my name is $name';
  print(message); // Hello, my name is Carlos
  
  // Interpolation with expressions
  String introduction = 'I am $age years old and next year I will be ${age + 1}';
  print(introduction); // I am 25 years old and next year I will be 26
  
  // Interpolation with properties
  String list = 'Shopping list: ${['apples', 'milk', 'bread']}';
  print(list); // Shopping list: [apples, milk, bread]
}
[end]
[trycode] 9375d5f2e5afb0049c2deabf728a2102

[p]
La interpolación con `$` es más legible y eficiente que la concatenación.

[p]
Puedes usar `${}` para expresiones más complejas.

[st] Strings multilínea

[c:dart]
void main() {
  // Multiline string with triple quotes
  String poem = '''
  The wind blows
  The leaves fall
  It's autumn
  ''';
  print(poem);
  
  // Multiline string with double quotes
  String letter = """
  Dear Sir:
  
  I am writing to inform you...
  
  Best regards.
  """;
  print(letter);
}
[end]
[trycode] fb3770f6687957ed296000cfe5a6e483

[p]
Usa comillas triples `'''` o `"""` para strings que ocupan múltiples líneas.

[st] Métodos útiles de strings

[c:dart]
void main() {
  String text = '  Hello World  ';
  
  print(text.toUpperCase()); //   HELLO WORLD  
  print(text.toLowerCase()); //   hello world  
  print(text.trim()); // Hello World
  print(text.length); // 13
  print(text.contains('World')); // true
  print(text.startsWith('  ')); // true
  print(text.endsWith('  ')); // true
}
[end]
[trycode] 4c4d6995aece9660c1b65839437c4c03

[p]
`toUpperCase()` y `toLowerCase()` cambian el caso.

[p]
`trim()` elimina espacios al inicio y final.

[p]
`contains()`, `startsWith()` y `endsWith()` verifican contenido.


