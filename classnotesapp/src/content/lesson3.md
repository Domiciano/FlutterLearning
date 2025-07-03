[t] Trabajando con Strings

[p]
Los strings en Dart son secuencias de caracteres que puedes manipular de varias formas. Vamos a ver las más comunes: concatenación e interpolación.

[st] Concatenación de strings

[c:dart]
void main() {
  String nombre = 'Ana';
  String apellido = 'García';
  
  // Concatenación con +
  String nombreCompleto = nombre + ' ' + apellido;
  print(nombreCompleto); // Ana García
  
  // Concatenación con +
  String saludo = 'Hola ' + nombre;
  print(saludo); // Hola Ana
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
  String nombre = 'Carlos';
  int edad = 25;
  
  // Interpolación simple con $
  String mensaje = 'Hola, me llamo $nombre';
  print(mensaje); // Hola, me llamo Carlos
  
  // Interpolación con expresiones
  String presentacion = 'Tengo $edad años y el año que viene tendré ${edad + 1}';
  print(presentacion); // Tengo 25 años y el año que viene tendré 26
  
  // Interpolación con propiedades
  String lista = 'Lista de compras: ${['manzanas', 'leche', 'pan']}';
  print(lista); // Lista de compras: [manzanas, leche, pan]
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
  // String multilínea con comillas triples
  String poema = '''
  El viento sopla
  Las hojas caen
  Es otoño
  ''';
  print(poema);
  
  // String multilínea con comillas dobles
  String carta = """
  Estimado señor:
  
  Le escribo para informarle...
  
  Saludos cordiales.
  """;
  print(carta);
}
[end]
[trycode] fb3770f6687957ed296000cfe5a6e483

[p]
Usa comillas triples `'''` o `"""` para strings que ocupan múltiples líneas.

[st] Métodos útiles de strings

[c:dart]
void main() {
  String texto = '  Hola Mundo  ';
  
  print(texto.toUpperCase()); //   HOLA MUNDO  
  print(texto.toLowerCase()); //   hola mundo  
  print(texto.trim()); // Hola Mundo
  print(texto.length); // 13
  print(texto.contains('Mundo')); // true
  print(texto.startsWith('  ')); // true
  print(texto.endsWith('  ')); // true
}
[end]
[trycode] 4c4d6995aece9660c1b65839437c4c03

[p]
`toUpperCase()` y `toLowerCase()` cambian el caso.

[p]
`trim()` elimina espacios al inicio y final.

[p]
`contains()`, `startsWith()` y `endsWith()` verifican contenido.


