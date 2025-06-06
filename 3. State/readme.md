
# Introducción al Estado en Flutter

Flutter dibuja la interfaz como un **árbol de widgets**.  
Cada vez que algo cambia, **reconstruye** los widgets que deben cambiar.


## 1. StatelessWidget: sin estado

Un widget que **no cambia con el tiempo**. Recibe todo como parámetro.

```dart
class MiEtiqueta extends StatelessWidget {
  final String texto;

  const MiEtiqueta({required this.texto});

  @override
  Widget build(BuildContext context) {
    return Text(texto);
  }
}
```

👉 Si el texto cambia, **tiene que venir de afuera**.



## 2. StatefulWidget: con estado interno

Un widget que **puede cambiar con el tiempo** y se redibuja con `setState`.

```dart
class Contador extends StatefulWidget {
  @override
  State<Contador> createState() => _ContadorState();
}

class _ContadorState extends State<Contador> {
  int cuenta = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Cuenta: \$cuenta'),
        ElevatedButton(
          onPressed: () => setState(() => cuenta++),
          child: Text('Sumar'),
        ),
      ],
    );
  }
}
```

`setState` le dice a Flutter: **"redibuja desde aquí"**.



## 3. Paso de datos entre widgets

Un `StatefulWidget` puede pasar su estado a hijos que no lo tienen.

```dart
class EtiquetaConEstilo extends StatelessWidget {
  final String texto;

  const EtiquetaConEstilo({required this.texto});

  @override
  Widget build(BuildContext context) {
    return Text(
      texto,
      style: TextStyle(fontSize: 24),
    );
  }
}

class App extends StatefulWidget {
  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  int cuenta = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        EtiquetaConEstilo(texto: 'Cuenta: \$cuenta'),
        ElevatedButton(
          onPressed: () => setState(() => cuenta++),
          child: Text('Sumar'),
        ),
      ],
    );
  }
}
```

El estado vive en el padre (`_AppState`) y se **pasa como parámetro** al hijo (`EtiquetaConEstilo`).


## 4. El árbol de widgets y las actualizaciones

Flutter redibuja **desde el widget donde ocurre el cambio hacia abajo**.

```dart
Column(
  children: [
    MiHeaderFijo(),         // Nunca se reconstruye
    Contador(),             // Solo este se redibuja
  ],
)
```

Esto hace que Flutter sea **eficiente**: si un widget no depende del estado, no se toca.

---

## 5. ¿Qué sigue?

Si necesitás compartir estado entre **muchos widgets**, es mejor usar herramientas como:

- `InheritedWidget` (manual)
- `Provider` (recomendado por Flutter)
- `Riverpod` (moderno y potente)
- `Bloc / Cubit` (más estructurado, ideal en apps grandes)

---

## Reglas clave hasta ahora 

- Usa `StatelessWidget` si el widget **no cambia**.
- Usa `StatefulWidget` si tiene que **responder a eventos o actualizar su UI**.
- `setState()` se usa para decirle a Flutter: **algo cambió, redibuja esto**.
- Pasá datos como parámetros para mantener **el control del árbol**.
