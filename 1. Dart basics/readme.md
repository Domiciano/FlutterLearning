# 1. Hello world
En dart, el método principal es el main.

Aqui vemos un ejemplo de Hello World
```dart
void main() {
  print('Hello, World!');
}
```

# 2. Variables
En dart hay type inference, de modo que puede generar las siguientes variables usando la palabra 'var'.

```dart
//Variable String
var alfa = 'Esto es un string';
//Variable int
var beta = 21;
//Variable double
var gamma = 4.8;
//Variable boolean
var delta = true;
```

Se puede también especificar el tipo de dato
```dart
//Variable String
String alfa = 'Esto es un string';
//Variable int
int beta = 21;
//Variable double
double gamma = 4.8;
//Variable boolean
bool delta = true;
```
# 3. Operadores
```dart
void main() {
  // Operadores aritméticos
  var suma = 10 + 5; // 15
  var resta = 10 - 5; // 5
  var multiplicacion = 10 * 5; // 50
  var division = 10 / 5; // 2.0
  var divisionEntera = 10 ~/ 5; // 2
  var modulo = 10 % 5; // 0

  // Operadores unarios
  var positivo = 10;
  var negativo = -positivo; // -10
  var incremento = 10++; // 10 (incrementa después de la asignación)
  var decremento = 10--; // 10 (decrementa después de la asignación)

  // Operadores relacionales
  var mayor = 10 > 5; // true
  var menor = 10 < 5; // false
  var mayorIgual = 10 >= 5; // true
  var menorIgual = 10 <= 5; // false
  var igual = 10 == 5; // false
  var diferente = 10 != 5; // true

  // Operadores lógicos
  var and = 10 > 5 && 5 < 10; // true
  var or = 10 > 5 || 5 < 10; // true
  var not = !mayor; // false

  // Operadores de asignación
  var asignacion = 10;
  var asignacionSuma = asignacion += 5; // 15
  var asignacionResta = asignacion -= 5; // 10
  var asignacionMultiplicacion = asignacion *= 5; // 50
  var asignacionDivision = asignacion /= 5; // 10
  var asignacionModulo = asignacion %= 5; // 0

  // Operadores de tipo
  var entero = 10;
  var cadena = "Hola";
  var esEntero = entero is int; // true
  var esCadena = cadena is String; // true

  // Operadores de acceso a propiedades
  var persona = {
    "nombre": "Juan",
    "edad": 30
  };
  var nombrePersona = persona["nombre"]; // "Juan"
  var edadPersona = persona["edad"]; // 30

  // Operadores de acceso a elementos de lista
  var lista = [1, 2, 3, 4, 5];
  var primerElemento = lista[0]; // 1
  var ultimoElemento = lista[lista.length - 1]; // 5

  // Operadores de rango
  var rango = 1..10; // Rango de 1 a 10 inclusive
  for (var numero in rango) {
    print(numero);
  }

  // Operadores nulos
  var variableNula;
  var esNulo = variableNula == null; // true
  var valorNulo = variableNula ?? 0; // 0

  // Operadores de interrogación
  var condicion = 10 > 5;
  var resultado = condicion ? "Verdadero" : "Falso"; // "Verdadero"

  // Operadores de cascada
  var personaCascada = Persona()
    ..nombre = "Pedro"
    ..edad = 25;
  print(personaCascada.nombre); // "Pedro"
  print(personaCascada.edad); // 25
}

class Persona {
  String nombre;
  int edad;
}

```


# 4. Estructuras
Las estructuras de datos típicas son
```dart
//Arreglo. List<String>
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
//Arreglo. List<int>
var list = [1, 2, 3, 4];
//Mapa
var gifts = {
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};
//Set
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

Declaradas de forma específica es
```dart
//Arreglo. List<String>
List<String> flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
//Arreglo. List<int>
List<int> list = [1, 2, 3, 4];
//Mapa
Map<String,String> gifts = {
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};
//Set
Set<String> halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

# 3.1 Procesos de listas


```dart
void main() {
  // Crear una lista vacía
  List<String> lista = [];

  // Añadir 3 elementos
  lista.add("alfa");
  lista.add("beta");
  lista.add("gamma");
  lista.add("delta");
  lista.add("epsilon");
  lista.add("zeta");
  lista.add("eta");

  // Imprimir la lista
  print(lista);

  // Remover un elemento por valor
  lista.remove("alfa");

  // Remover un elemento por índice
  lista.removeAt(4);

  // Imprimir de nuevo la lista
  print(lista);

  // Iterar los elementos de la lista
  for (var element in lista) {
    print(element);
  }

  // Foreach a través de la lista
  lista.forEach((element) {
    print(element);
  });

  // Iterar la lista por medio de índices
  for (int i = 0; i < lista.length; i++) {
    var element = lista[i];
    print("Index: $i, Value: $element");
  }

  // Where filtra los elementos de acuerdo a una condición. Map trasnforma los elementos filtrados de acuerdo al retorno
  List<int> evenSizeList = lista.where((element) => lista.indexOf(element) % 2 == 0)
                                .map((evenElement) => evenElement.length)
                                .toList();
  print(evenSizeList);
  
}
```

