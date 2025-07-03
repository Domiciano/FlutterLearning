[t] Métodos en Dart

[p]
Los métodos son bloques de código reutilizables. En Dart, puedes crear funciones tradicionales, lambdas (arrow functions) y usar funciones de orden superior.

[st] Funciones básicas

[c:dart]
void main() {
  saludar('Ana');
  int resultado = sumar(5, 3);
  print('Resultado: $resultado');
}

// Función que no retorna valor
void saludar(String nombre) {
  print('Hola, $nombre!');
}

// Función que retorna un valor
int sumar(int a, int b) {
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
  saludarPersona('Carlos');
  saludarPersona('María', 'Buenos días');
  saludarPersona('Juan', 'Hola', 'amigo');
}

// Parámetros opcionales con []
void saludarPersona(String nombre, [String? saludo, String? apellido]) {
  String mensaje = saludo ?? 'Hola';
  String nombreCompleto = apellido != null ? '$nombre $apellido' : nombre;
  print('$mensaje, $nombreCompleto!');
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
  // Arrow function simple
  int cuadrado(int x) => x * x;
  
  // Arrow function con múltiples líneas
  String formatearNombre(String nombre, String apellido) => 
    '${nombre.toUpperCase()} ${apellido.toUpperCase()}';
  
  print(cuadrado(5)); // 25
  print(formatearNombre('ana', 'garcía')); // ANA GARCÍA
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
  List<int> numeros = [1, 2, 3, 4, 5];
  
  // Pasar función como parámetro
  procesarLista(numeros, (n) => n * 2);
  procesarLista(numeros, (n) => n + 10);
}

void procesarLista(List<int> lista, int Function(int) operacion) {
  for (int numero in lista) {
    int resultado = operacion(numero);
    print('$numero -> $resultado');
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
  List<int> numeros = [1, 2, 3, 4, 5, 6];
  
  // forEach: ejecutar función en cada elemento
  numeros.forEach((n) => print('Número: $n'));
  
  // map: transformar cada elemento
  List<String> textos = numeros.map((n) => 'Valor $n').toList();
  print(textos);
  
  // where: filtrar elementos
  List<int> pares = numeros.where((n) => n % 2 == 0).toList();
  print(pares);
  
  // reduce: combinar elementos
  int suma = numeros.reduce((a, b) => a + b);
  print('Suma total: $suma');
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