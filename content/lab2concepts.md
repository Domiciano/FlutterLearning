# Conceptos iniciales
<!-- tags: super.key, super-parámetros, constructor const, required this,
     Function(), funciones de orden superior, funciones como parámetro, callback,
     clausura, StatelessWidget, props, modificar estado del padre,
     onPressed no se ejecuta -->

## Creando componentes en Flutter

En Flutter la interfaz se construye con pequeños bloques llamados `Widgets`. Piensa en
ellos como piezas de Lego: combinas varios simples para armar interfaces complejas y
reutilizables. A eso lo llamamos "componetizar".

Un widget es simplemente una clase de Dart que hereda de `StatelessWidget` o
`StatefulWidget`. Empezaremos por los `StatelessWidget`, que no guardan estado interno.
Crear uno es crear una clase y definir su apariencia en el método `build`.

```dart
import 'package:flutter/material.dart';

class SaludoWidget extends StatelessWidget {
  const SaludoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      '¡Hola, desde nuestro primer componente!',
      style: TextStyle(fontSize: 20, color: Colors.white),
    );
  }
}
```

### El constructor

Fíjate en el constructor, porque tiene tres cosas que se repiten en todo componente:

```dart
class MoodButton extends StatelessWidget {
  final String text;
  final bool isSelected;
  final double margin;

  const MoodButton({
    super.key,             // 1. la key
    required this.text,    // 2. parámetros obligatorios
    required this.isSelected,
    this.margin = 8,       // 3. parámetros con valor por defecto
  });

  @override
  Widget build(BuildContext context) => Text(text);
}
```

**1. `super.key`.** Todo componente hereda de `StatelessWidget` o `StatefulWidget`, y
esas clases padre reciben un parámetro `key`. Escribir `super.key` declara ese
parámetro y **se lo reenvía al padre** de una vez.

La `Key` es un identificador que Flutter usa para diferenciar un widget de otro. Si
tienes varios widgets iguales en pantalla y uno cambia, se elimina o se mueve, Flutter
necesita saber cuál fue para actualizar solo esa parte.

**2. `required this.text`.** El `this.` significa "guarda este parámetro directamente
en el campo con ese nombre". Sin él tendrías que asignarlo a mano. Como lleva
`required`, quien use el componente está obligado a pasarlo.

**3. `this.margin = 8`.** Parámetro opcional con valor por defecto. Al no llevar
`required`, se puede omitir.

### ¿Por qué `const`?

El constructor es `const`, y eso solo es posible si **todos** los campos son `final`. A
cambio, Flutter puede reutilizar la misma instancia del widget cuando nada cambió, en
vez de crear una nueva en cada `build`. Es gratis: declara siempre los campos como
`final` y el constructor como `const`.

## Usando Variables como Propiedades (Props)

Un componente no es muy útil si siempre muestra lo mismo. Queremos poder pasarle datos para que sea dinámico. A estos datos los llamamos "propiedades" (o "props", como en otros frameworks).

Para pasar datos, simplemente declaramos variables `final` en nuestro widget y las inicializamos en el constructor.

```dart
import 'package:flutter/material.dart';

class SaludoPersonalizado extends StatelessWidget {
  // 1. Declaramos la propiedad que queremos recibir
  final String nombre;

  // 2. La añadimos como un parámetro requerido en el constructor
  const SaludoPersonalizado({super.key, required this.nombre});

  @override
  Widget build(BuildContext context) {
    // 3. Usamos la propiedad dentro de nuestro widget
    return Text(
      '¡Hola, $nombre!',
      style: const TextStyle(fontSize: 22, color: Colors.white, fontWeight: FontWeight.bold),
    );
  }
}

// Así lo usaríamos en otra parte de la app:
class MiPantalla extends StatelessWidget {
  const MiPantalla({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: SaludoPersonalizado(nombre: "Ana"), // Le pasamos el nombre aquí
      ),
    );
  }
}
```

## Funciones de orden superior y funciones como parámetro

En Dart **las funciones son valores**, igual que un `String` o un `int`. Se pueden
guardar en una variable, pasar como parámetro y devolver desde otra función.

Una **función de orden superior** (*higher-order function*) es simplemente una
función que **recibe** funciones como parámetro, **devuelve** una función, o las dos
cosas.

### Guardar una función en una variable

```dart
void saludar() {
  print('Hola');
}

void main() {
  var f = saludar;   // OJO: sin paréntesis. Guardo LA FUNCIÓN, no su resultado.
  f();               // Con paréntesis: ahora sí la ejecuto. Imprime: Hola
}
```

Esa diferencia es la que más confunde al principio:

- `saludar` → **la función misma**, un valor que se puede pasar.
- `saludar()` → **el resultado de ejecutarla**.

### Cómo se escribe el tipo de una función

El tipo se escribe con la palabra `Function` seguida de los parámetros que recibe:

| Tipo | Significa |
|---|---|
| `Function()` | una función que no recibe nada |
| `Function(String)` | una función que recibe un `String` |
| `Function(int, int)` | una función que recibe dos `int` |

```dart
Function() alCerrar;
Function(String) alEscribir;
```

### Funciones anónimas

No siempre vale la pena declarar una función con nombre. Se puede escribir ahí mismo:

```dart
// Función anónima con cuerpo
Function(String) alEscribir = (valor) {
  print('El usuario escribió $valor');
};

// La misma, con flecha, cuando es una sola expresión
Function(String) alEscribir2 = (valor) => print('El usuario escribió $valor');
```

### Recibir una función como parámetro

Esto es lo que hace todo componente interactivo. En vez de decidir qué pasa cuando lo
tocan, **recibe** esa decisión desde afuera:

```dart
import 'package:flutter/material.dart';

class BotonPersonalizado extends StatelessWidget {
  final String texto;
  final Function() onPressed;   // ← una función como parámetro

  const BotonPersonalizado({
    super.key,
    required this.texto,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => onPressed(),   // la llamo cuando el usuario toca
      child: Text(texto),
    );
  }
}
```

Y quien lo usa decide qué debe pasar:

```dart
class MiPantalla extends StatelessWidget {
  const MiPantalla({super.key});

  void _guardar() {
    print('Guardando...');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: BotonPersonalizado(
          texto: 'Guardar',
          onPressed: _guardar,   // paso la función, NO la ejecuto
        ),
      ),
    );
  }
}
```

Esto es lo que hace que un componente sea **reutilizable**: el `BotonPersonalizado` no
sabe ni le importa qué va a pasar cuando lo toquen. Solo sabe que tiene que llamar a
la función que le entregaron.

### El error más común

```dart
onPressed: _guardar()    // ❌ ejecuta _guardar AHORA, al construir la pantalla,
                         //    y le pasa al botón lo que ella devuelva (null)

onPressed: _guardar      // ✅ le pasa la función para que el botón la llame después
```

### Cuando hay que pasarle argumentos

Si la función que quiere ejecutar necesita parámetros, no puede pasarla directo:
tiene que envolverla en una función anónima.

```dart
void _elegirMood(String mood) {
  setState(() => _mood = mood);
}

// ...

MoodButton(
  text: 'Chill',
  isSelected: _mood == 'Chill',
  onPressed: () => _elegirMood('Chill'),   // función sin parámetros que,
)                                          // al ejecutarse, llama a la otra
```

La función anónima `() => _elegirMood('Chill')` sí cumple el tipo `Function()`, y por
dentro se acuerda del valor `'Chill'`. A eso se le llama **clausura** (*closure*): la
función "se lleva" las variables del lugar donde fue escrita.

### Modificar el estado del padre desde el hijo

Fíjate en lo que acaba de pasar en ese ejemplo: `_elegirMood` hace `setState` sobre una
variable que vive en la **pantalla**, no en el botón. Y sin embargo quien decide cuándo
ejecutarla es el `MoodButton`.

Ese es el uso más importante de pasar funciones como parámetro: **un componente hijo
puede modificar una variable de estado del padre**, si el padre le entrega la función
que la modifica.

```dart
class _MiPantallaState extends State<MiPantalla> {
  int _contador = 0;   // el estado vive aquí

  void _sumar() {
    setState(() => _contador++);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Van $_contador'),
        BotonPersonalizado(
          texto: 'Sumar',
          onPressed: _sumar,   // le entrego la función que modifica mi estado
        ),
      ],
    );
  }
}
```

El `BotonPersonalizado` no sabe que existe `_contador`, ni llama a `setState`. Solo
ejecuta la función que le dieron cuando el usuario lo toca. El padre es el que tiene el
estado y el que decide qué se puede hacer con él.

### Devolver una función

Una función de orden superior también puede **devolver** otra función. Se usa poco al
principio, pero es útil para fabricar callbacks parecidos:

```dart
Function() saludadorDe(String nombre) {
  return () => print('Hola, $nombre');
}

void main() {
  final saludarAna = saludadorDe('Ana');
  final saludarLuis = saludadorDe('Luis');

  saludarAna();    // Hola, Ana
  saludarLuis();   // Hola, Luis
}
```

### Convención del curso

Vamos a escribir los tipos función como `Function()` y `Function(Tipo)`. Flutter tiene
sus propios alias para lo mismo — `VoidCallback` es `Function()`, y
`ValueChanged<String>` es `Function(String)` — pero preferimos la sintaxis explícita
para que se vea qué es lo que está pasando.

Eso sí: los widgets **de Flutter** sí piden sus alias. Por eso, cuando nuestro
componente le entrega el callback a un widget de Flutter, lo envuelve:

```dart
ElevatedButton(onPressed: () => onPressed(), ...)
```

Al componetizar, creamos widgets reutilizables, mantenibles y fáciles de entender. Esta es la base para construir aplicaciones robustas y escalables en Flutter.
