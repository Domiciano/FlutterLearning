[t] Trabajando con Strings
Los strings en Dart son secuencias de caracteres que puedes manipular de varias formas. Vamos a ver las más comunes: concatenación e interpolación.

[st] Concatenación de strings
[code:dart]
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
[endcode]
[trycode] 9ea5113dcc307145e4f26950b3770012
La concatenación con `+` es la forma más simple de unir strings.
También puedes usar interpolación para unir strings.

[st] Interpolación de strings
[code:dart]
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
[endcode]
[trycode] 9375d5f2e5afb0049c2deabf728a2102
La interpolación con `$` es más legible y eficiente que la concatenación.
Puedes usar `${}` para expresiones más complejas.

[st] Strings multilínea
[code:dart]
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
[endcode]
[trycode] fb3770f6687957ed296000cfe5a6e483
Usa comillas triples `'''` o `"""` para strings que ocupan múltiples líneas.

[st] Métodos útiles de strings
[code:dart]
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
[endcode]
[trycode] 4c4d6995aece9660c1b65839437c4c03
`toUpperCase()` y `toLowerCase()` cambian el caso.

`trim()` elimina espacios al inicio y final.

`contains()`, `startsWith()` y `endsWith()` verifican contenido.


