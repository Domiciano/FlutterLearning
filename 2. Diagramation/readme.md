# Principios de Diagramación en Flutter  

En Flutter, `Row` y `Column` son los widgets base para ubicar elementos en una **línea horizontal** o **vertical**, respectivamente.


## `Row`: Distribución horizontal

```dart
Row(
  children: [
    Icon(Icons.star),
    Text('Estrella'),
    Icon(Icons.star_border),
  ],
)
```

Acomoda los elementos **de izquierda a derecha**.  

Usa `mainAxisAlignment` para controlar el **eje principal** (horizontal):

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [ ... ]
)
```

Usa `crossAxisAlignment` para alinear en el eje **vertical**:

```dart
Row(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [ ... ]
)
```


## `Column`: Distribución vertical

```dart
Column(
  children: [
    Text('Título'),
    SizedBox(height: 8),
    Text('Subtítulo'),
  ],
)
```

Acomoda los elementos **de arriba a abajo**.  

`mainAxisAlignment`: controla la distribución vertical:

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [ ... ]
)
```

`crossAxisAlignment`: controla la alineación **horizontal**:

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.end,
  children: [ ... ]
)
```


## Reglas clave

- `mainAxis` = la dirección en la que fluye (`Row` → horizontal, `Column` → vertical).
- `crossAxis` = el eje perpendicular.

---

## Pro Tip

Querés centrar todo fácil:

```dart
Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [ ... ]
  ),
)
```








# Expanded, Spacer y Flex en Flutter

Estos widgets permiten controlar cómo se distribuyen los espacios dentro de un Row o Column cuando hay más de un elemento.


# Expanded

`Expanded` toma el espacio disponible en el eje principal. Se puede usar para que un widget crezca y ocupe lo que queda.

```dart
Row(
  children: [
    Icon(Icons.star),
    Expanded(child: Text('Texto que ocupa el espacio restante')),
  ],
)
```

Puedes usar más de un Expanded. Por defecto, cada uno recibe una fracción igual del espacio:

```dart
Row(
  children: [
    Expanded(child: Container(color: Colors.red)),
    Expanded(child: Container(color: Colors.blue)),
  ],
)
```
La proporción se puede ajustar con flex:

```dart
Row(
  children: [
    Expanded(flex: 2, child: Container(color: Colors.red)),
    Expanded(flex: 1, child: Container(color: Colors.blue)),
  ],
)
```

# Spacer
`Spacer` es una forma específica de usar `Expanded` sin tener que definir un hijo.

```dart
Row(
  children: [
    Icon(Icons.menu),
    Spacer(),
    Icon(Icons.search),
  ],
)
```
Funciona igual que Expanded, acepta flex:

```dart
Row(
  children: [
    Icon(Icons.menu),
    Spacer(flex: 2),
    Icon(Icons.search),
    Spacer(flex: 1),
    Icon(Icons.settings),
  ],
)
```

# Flex
Flex es el widget base detrás de Row y Column. Se usa cuando querés elegir la dirección en tiempo de ejecución.

```dart
Flex(
  direction: Axis.horizontal,
  children: [
    Expanded(child: Text('Uno')),
    Expanded(child: Text('Dos')),
  ],
)
```

Es útil si necesitás alternar entre orientación vertical y horizontal según una condición.


### Reglas clave

- Expanded y Spacer funcionan solo dentro de un Flex, Row o Column.

- Spacer es más directo si no necesitás un hijo.

- flex define la proporción del espacio que se asigna entre múltiples widgets.

