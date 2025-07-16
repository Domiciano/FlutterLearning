[t] Métodos en Dart

[p]
Los métodos son bloques de código reutilizables. En Dart, puedes crear funciones tradicionales, lambdas (arrow functions) y usar funciones de orden superior.

[st] Funciones básicas




[c:dart]
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
[end]
[trycode] 68338a515c29a0e4aeace145b03f7b56


[p]
Las funciones pueden retornar valores o no (void).

[p]
Define el tipo de retorno y los tipos de los parámetros.

[st] Parámetros opcionales

[c:dart]
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
[end]
[trycode] 5d5ab9f43ddc1bdeeedff7b1b8621318

[p]
Usa `[]` para parámetros opcionales.

[p]
El operador `??` proporciona un valor por defecto.

[st] Arrow functions (lambdas)

[c:dart]
void main() {
  // Simple arrow function
  int square(int x) => x * x;
  
  // Arrow function with multiple lines
  String formatName(String name, String lastName) => 
    '${name.toUpperCase()} ${lastName.toUpperCase()}';
  
  print(square(5)); // 25
  print(formatName('ana', 'garcía')); // ANA GARCÍA
}
[end]
[trycode] 434d65b18c81965a6b9b9a97d4c52157

[p]
Las arrow functions usan `=>` para retornar un valor.

[p]
Son más concisas que las funciones tradicionales.

[st] Funciones como parámetros

[c:dart]
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
[end]
[trycode] 4936efe856a80d0df046d0584523b8c1

[p]
Las funciones pueden recibir otras funciones como parámetros.

[p]
`int Function(int)` es el tipo de una función que recibe y retorna int.

[st] High order functions

[c:dart]
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
[end]
[trycode] bc57d9043c1423e18fcb0a34399ae8cd

[p]
`forEach` ejecuta una función en cada elemento.

[p]
`map` transforma cada elemento y retorna una nueva lista.

[p]
`where` filtra elementos según una condición.

[p]
`reduce` combina todos los elementos en un solo valor. 