[t] Listas y mapas

[p]
Las listas y mapas son estructuras de datos fundamentales en Dart. Aprenderás a crearlas y recorrerlas de diferentes formas.

[st] Listas (Arrays)

[c:dart]
void main() {
  // Crear una lista
  List<String> frutas = ['manzana', 'banana', 'naranja'];
  
  // Agregar elementos
  frutas.add('uva');
  frutas.addAll(['pera', 'mango']);
  
  // Acceder por índice
  print(frutas[0]); // manzana
  print(frutas.length); // 6
}
[end]
[trycode] 861f536e05b1f549f3477bbec1af1296

[p]
Las listas almacenan elementos ordenados y accesibles por índice.

[p]
Usa `add()` para un elemento y `addAll()` para múltiples.

[st] Recorrer listas con for

[c:dart]
void main() {
  List<int> numeros = [1, 2, 3, 4, 5];
  
  // for tradicional con índice
  for (int i = 0; i < numeros.length; i++) {
    print('Índice $i: ${numeros[i]}');
  }
  
  // for-in (foreach)
  for (int numero in numeros) {
    print('Número: $numero');
  }
  
  // forEach con función
  numeros.forEach((numero) {
    print('Valor: $numero');
  });
}
[end]
[trycode] b35f2f1791d67b9d6dd65360f8cdf620

[p]
El `for` tradicional te da control del índice.

[p]
El `for-in` es más simple para recorrer valores.

[p]
`forEach()` ejecuta una función para cada elemento.

[st] Mapas (Dictionaries)

[c:dart]
void main() {
  // Crear un mapa
  Map<String, int> edades = {
    'Ana': 25,
    'Carlos': 30,
    'María': 28,
  };
  
  // Agregar elementos
  edades['Juan'] = 35;
  
  // Acceder por clave
  print(edades['Ana']); // 25
  print(edades.length); // 4
}
[end]
[trycode] ed87a5e54b7b469aa862ec9b4bb7ed36

[p]
Los mapas almacenan pares clave-valor.

[p]
Accede a valores usando la clave como índice.

[st] Recorrer mapas

[c:dart]
void main() {
  Map<String, String> paises = {
    'Colombia': 'Bogotá',
    'Argentina': 'Buenos Aires',
    'México': 'Ciudad de México',
  };
  
  // Recorrer claves
  for (String pais in paises.keys) {
    print('País: $pais');
  }
  
  // Recorrer valores
  for (String capital in paises.values) {
    print('Capital: $capital');
  }
  
  // Recorrer claves y valores
  paises.forEach((pais, capital) {
    print('$pais - $capital');
  });
}
[end]
[trycode] 6d5ee941076ea161b3880ac8ef888664

[p]
Usa `.keys` para recorrer solo las claves.

[p]
Usa `.values` para recorrer solo los valores.

[p]
`forEach()` te da acceso a clave y valor.

[st] Métodos funcionales: map y filter

[c:dart]
void main() {
  List<int> numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // map: transformar cada elemento
  List<String> numerosTexto = numeros.map((n) => 'Número $n').toList();
  print(numerosTexto);
  
  // filter: filtrar elementos
  List<int> pares = numeros.where((n) => n % 2 == 0).toList();
  print(pares); // [2, 4, 6, 8, 10]
  
  // Combinar map y filter
  List<String> paresTexto = numeros
      .where((n) => n % 2 == 0)
      .map((n) => 'Par: $n')
      .toList();
  print(paresTexto);
}
[end]
[trycode] 81d33660c5e44ead08be3a817cc33122

[p]
`map()` transforma cada elemento de la lista.

[p]
`where()` (filter) selecciona elementos que cumplan una condición.

[p]
Puedes encadenar estos métodos para operaciones complejas. 