# Conceptos iniciales
<!-- tags: super.key, super-parámetros, constructor const, required this,
     Function(), funciones de orden superior, funciones como parámetro, callback,
     clausura, StatelessWidget, props, onPressed no se ejecuta -->

## Creando Componentes en Flutter

En Flutter, la interfaz de usuario se construye a partir de pequeños bloques de construcción llamados `Widgets`. Piensa en ellos como si fueran piezas de Lego: puedes combinar varios widgets simples para crear interfaces complejas y reutilizables. A este proceso lo llamamos "componetizar".

## Definiendo un Componente (Widget)

Un widget es simplemente una clase de Dart que hereda de `StatelessWidget` o `StatefulWidget`. Para empezar, nos enfocaremos en los `StatelessWidget`, que son componentes simples sin estado interno.

Crear un widget es tan fácil como crear una clase y definir su apariencia en el método `build`.

```dart
import 'package:flutter/material.dart';

// Definimos nuestro nuevo widget llamado SaludoWidget
class SaludoWidget extends StatelessWidget {
  // El constructor
  const SaludoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    // El método build devuelve el widget que se mostrará en pantalla
    return const Text(
      '¡Hola, desde nuestro primer componente!',
      style: TextStyle(fontSize: 20, color: Colors.white),
    );
  }
}
```

## El constructor de un componente y `super`

Todo componente hereda de `StatelessWidget` o `StatefulWidget`. Esas clases padre ya
tienen su propio constructor, que recibe un parámetro llamado `key`. Cuando usted
escribe el constructor de su componente, tiene que **pasarle ese `key` al padre**.

### Qué es `key`

La `Key` es un identificador que Flutter usa para diferenciar un widget de otro.

Imagine que tiene varios widgets iguales en pantalla. Si uno cambia, se elimina o se
mueve, Flutter necesita saber exactamente cuál fue para actualizar solo esa parte. La
`Key` le da esa información y le ahorra trabajo.

### La forma larga

Antes de Dart 2.17 había que recibir el `key` y reenviarlo a mano al constructor del
padre, después de los dos puntos:

```dart
class MiComponente extends StatelessWidget {
  final String texto;

  const MiComponente({Key? key, required this.texto}) : super(key: key);
  //                  └── lo recibo ──┘                  └── se lo paso al padre ──┘

  @override
  Widget build(BuildContext context) => Text(texto);
}
```

Lea la línea completa: "recibo un `Key?` opcional llamado `key`, recibo un `texto`
obligatorio, y **llamo al constructor de mi superclase** pasándole ese `key`".

### La forma corta: `super.key`

Desde Dart 2.17 existen los **super-parámetros**. Escribir `super.key` en la lista de
parámetros hace las dos cosas de una vez: declara el parámetro y lo reenvía al padre.

```dart
class MiComponente extends StatelessWidget {
  final String texto;

  const MiComponente({super.key, required this.texto});

  @override
  Widget build(BuildContext context) => Text(texto);
}
```

Las dos versiones hacen exactamente lo mismo. La segunda es la que vamos a usar.

### Las tres cosas que hace un constructor de componente

```dart
class MoodButton extends StatelessWidget {
  final String text;
  final bool isSelected;
  final Function() onPressed;

  const MoodButton({
    super.key,                    // 1. reenvía la key al padre
    required this.text,           // 2. inicializa el campo `text`
    required this.isSelected,
    required this.onPressed,
    this.margin = 8,              // 3. o le da un valor por defecto
  });

  final double margin;
  ...
}
```

1. `super.key` — reenvía la `key` a `StatelessWidget`.
2. `required this.text` — el `this.` significa "guarde este parámetro directamente en
   el campo con ese nombre". Sin el `this.` tendría que asignarlo usted a mano.
3. `this.margin = 8` — parámetro opcional con valor por defecto. Como no lleva
   `required`, quien use el componente puede omitirlo.

### ¿Por qué `const`?

Fíjese en que el constructor es `const`. Eso solo es posible si **todos** los campos
son `final`. A cambio, Flutter puede reutilizar la misma instancia del widget cuando
nada cambió, en vez de crear una nueva en cada `build`. Es gratis y ayuda al
rendimiento: declare siempre los campos como `final` y el constructor como `const`.

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
