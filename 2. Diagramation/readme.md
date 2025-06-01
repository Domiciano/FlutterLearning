# Principios de Diagramación en Flutter  

En Flutter, `Row` y `Column` son los widgets base para ubicar elementos en una **línea horizontal** o **vertical**, respectivamente.

---

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

---

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

---

## Reglas clave DomiStyle™:

- `mainAxis` = la dirección en la que fluye (`Row` → horizontal, `Column` → vertical).
- `crossAxis` = el eje perpendicular.
- Siempre que tengas dudas de alineación, pensá en el **flujo natural** del eje.

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
