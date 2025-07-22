[t] Métodos en Dart
Los métodos son bloques de código reutilizables. En Dart, puedes crear funciones tradicionales, lambdas (arrow functions) y usar funciones de orden superior.

[st] Funciones básicas
[code:dart]
void main() {
  greet('Ana');
  int result = add(5, 3);
  print('Result: $result');
}
// Function that does not return a value
void greet(String name) {
  print('Hello, $name!');
}
// Function that returns a value
int add(int a, int b) {
  return a + b;
}
[endcode]
[trycode] 68338a515c29a0e4aeace145b03f7b56
Las funciones pueden retornar valores o no (void). Define el tipo de retorno y los tipos de los parámetros.

[st] Parámetros opcionales
[code:dart]
void main() {
  greetPerson('Carlos');
  greetPerson('María', 'Good morning');
  greetPerson('Juan', 'Hello', 'friend');
}
// Optional parameters with []
void greetPerson(String name, [String? greeting, String? lastName]) {
  String message = greeting ?? 'Hello';
  String fullName = lastName != null ? '$name $lastName' : name;
  print('$message, $fullName!');
}
[endcode]
[trycode] 5d5ab9f43ddc1bdeeedff7b1b8621318
Usa `[]` para parámetros opcionales. El operador `??` proporciona un valor por defecto.

[st] Arrow functions (lambdas)
[code:dart]
void main() {
  // Simple arrow function
  int square(int x) => x * x;
  
  // Arrow function with multiple lines
  String formatName(String name, String lastName) => 
    '${name.toUpperCase()} ${lastName.toUpperCase()}';
  
  print(square(5)); // 25
  print(formatName('ana', 'garcía')); // ANA GARCÍA
}
[endcode]
[trycode] 434d65b18c81965a6b9b9a97d4c52157
Las arrow functions usan `=>` para retornar un valor. Son más concisas que las funciones tradicionales.

[st] Funciones como parámetros
[code:dart]
void main() {
  List<int> numbers = [1, 2, 3, 4, 5];
  
  // Pass function as parameter
  processList(numbers, (n) => n * 2);
  processList(numbers, (n) => n + 10);
}
void processList(List<int> list, int Function(int) operation) {
  for (int number in list) {
    int result = operation(number);
    print('$number -> $result');
  }
}
[endcode]
[trycode] 4936efe856a80d0df046d0584523b8c1
Las funciones pueden recibir otras funciones como parámetros. `int Function(int)` es el tipo de una función que recibe y retorna int.

[st] High order functions
[code:dart]
void main() {
  List<int> numbers = [1, 2, 3, 4, 5, 6];
  
  // forEach: execute function on each element
  numbers.forEach((n) => print('Number: $n'));
  
  // map: transform each element
  List<String> texts = numbers.map((n) => 'Value $n').toList();
  print(texts);
  
  // where: filter elements
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  print(evens);
  
  // reduce: combine elements
  int sum = numbers.reduce((a, b) => a + b);
  print('Total sum: $sum');
}
[endcode]
[trycode] bc57d9043c1423e18fcb0a34399ae8cd
[list]
`forEach` ejecuta una función en cada elemento.
`map` transforma cada elemento y retorna una nueva lista.
`where` filtra elementos según una condición.
`reduce` combina todos los elementos en un solo valor. 
[endlist]