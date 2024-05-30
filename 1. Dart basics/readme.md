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

# 3. Estructuras
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
}
```

