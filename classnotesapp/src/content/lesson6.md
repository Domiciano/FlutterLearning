[t] Listas y mapas

[p]
Las listas y mapas son estructuras de datos fundamentales en Dart. Aprenderás a crearlas y recorrerlas de diferentes formas.

[st] Listas (Arrays)

[c:dart]
void main() {
  // Create a list
  List<String> fruits = ['apple', 'banana', 'orange'];
  
  // Add elements
  fruits.add('grape');
  fruits.addAll(['pear', 'mango']);
  
  // Access by index
  print(fruits[0]); // apple
  print(fruits.length); // 6
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
  List<int> numbers = [1, 2, 3, 4, 5];
  
  // Traditional for with index
  for (int i = 0; i < numbers.length; i++) {
    print('Index $i:  numbers[i]}');
  }
  
  // for-in (foreach)
  for (int number in numbers) {
    print('Number: $number');
  }
  
  // forEach with function
  numbers.forEach((number) {
    print('Value: $number');
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
  // Create a map
  Map<String, int> ages = {
    'Ana': 25,
    'Carlos': 30,
    'María': 28,
  };
  
  // Add elements
  ages['Juan'] = 35;
  
  // Access by key
  print(ages['Ana']); // 25
  print(ages.length); // 4
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
  Map<String, String> countries = {
    'Colombia': 'Bogotá',
    'Argentina': 'Buenos Aires',
    'México': 'Ciudad de México',
  };
  
  // Iterate keys
  for (String country in countries.keys) {
    print('Country: $country');
  }
  
  // Iterate values
  for (String capital in countries.values) {
    print('Capital: $capital');
  }
  
  // Iterate keys and values
  countries.forEach((country, capital) {
    print('$country - $capital');
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
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // map: transform each element
  List<String> numbersText = numbers.map((n) => 'Number $n').toList();
  print(numbersText);
  
  // filter: filter elements
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  print(evens); // [2, 4, 6, 8, 10]
  
  // Combine map and filter
  List<String> evensText = numbers
      .where((n) => n % 2 == 0)
      .map((n) => 'Even: $n')
      .toList();
  print(evensText);
}
[end]
[trycode] 81d33660c5e44ead08be3a817cc33122

[p]
`map()` transforma cada elemento de la lista.

[p]
`where()` (filter) selecciona elementos que cumplan una condición.

[p]
Puedes encadenar estos métodos para operaciones complejas. 