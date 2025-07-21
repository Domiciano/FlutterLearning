[t] Container, Row y Column
En esta lección aprenderás a organizar y personalizar la disposición de los widgets en Flutter usando `Container`, `Row` y `Column`.
[v] 75xXoz6JvdY
[st] ¿Qué es Container?
`Container` es un widget versátil que funciona como un "div" en web. Permite personalizar el ancho, alto, color y otros estilos de un área de la pantalla. Solo puede tener un hijo, pero puedes anidar varios containers para lograr diseños complejos.

[code:dart]
Container(
  width: 200,
  height: 100,
  color: Colors.blueAccent,
  child: const Text('¡Hola Container!'),
)
[endcode]
[trycode] e72f039fcf090c873f437e52b708afeb

[list]
Puedes modificar el ancho (`width`), alto (`height`) y color (`color`).
Container solo puede tener un hijo, pero puedes anidar varios.
[endlist]

[st] ¿Qué son Row y Column?
`Row` y `Column` son widgets que permiten organizar varios widgets hijos en una fila (horizontal) o columna (vertical), muy parecido a Flexbox en web.

[code:dart]
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: const [
    Text('Alfa'),
    ElevatedButton(onPressed: null, child: Text('Botón')),
    Text('Gama'),
  ],
)
[endcode]
[trycode] ef8f89ce86a8a8a82493b8bd49ee9f16

[list]
`children` es una lista de widgets que se ubican de arriba a abajo (Column) o de izquierda a derecha (Row).
`mainAxisAlignment` y `crossAxisAlignment` controlan la alineación de los hijos (como justify-content y align-items en Flexbox).
Puedes anidar Rows y Columns para crear diseños complejos.
[endlist]

[st] Propiedades importantes de Row y Column
Row y Column comparten varias propiedades clave que te permiten controlar la disposición y alineación de los widgets hijos:

[list]
`children`: Lista de widgets que se ubican en la fila o columna.
`mainAxisAlignment`: Controla la alineación de los hijos en el eje principal (horizontal en Row, vertical en Column). Ejemplo: `MainAxisAlignment.center`, `spaceBetween`, `end`.
`crossAxisAlignment`: Controla la alineación en el eje secundario (vertical en Row, horizontal en Column). Ejemplo: `CrossAxisAlignment.start`, `center`, `end`, `stretch`.
`mainAxisSize`: Determina si la fila o columna ocupa el mínimo o máximo espacio posible (`MainAxisSize.min` o `MainAxisSize.max`).
`textDirection`: Define la dirección del texto y el orden de los hijos (por defecto `ltr`, pero puede ser `rtl`).
`verticalDirection`: Controla si los hijos se colocan de arriba a abajo (`down`, por defecto) o de abajo a arriba (`up`).
[endlist]

Por ejemplo, para centrar los elementos y estirarlos a lo largo del eje secundario:
[code:dart]
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: [
    Container(width: 50, color: Colors.red),
    Container(width: 50, color: Colors.green),
    Container(width: 50, color: Colors.blue),
  ],
)
[endcode]

[st] Ejemplo avanzado: combinando Container, Row y Column
[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Container, Row y Column')),
        body: Center(
          child: Container(
            width: 300,
            height: 300,
            color: Colors.grey[200],
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                const Text('Arriba'),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Container(width: 50, height: 50, color: Colors.green),
                    Container(width: 50, height: 50, color: Colors.blue),
                    Container(width: 50, height: 50, color: Colors.purple),
                  ],
                ),
                const Text('Abajo'),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 4c69a488c99cdbd1acd420ea21392532

[list]
`Container` te permite personalizar el área y el fondo.
`Column` organiza los widgets de arriba a abajo.
`Row` organiza los widgets de izquierda a derecha.
Puedes controlar la alineación y el espacio entre los elementos con las propiedades de Row y Column.
[endlist]

[t] Mezclando todo
En esta lección aprenderás a construir barras y composiciones visuales usando `Row`, `Column`, `Container` e `Icon` en Flutter, como las que se ven en la guía oficial de layouts.

[st] Barra de iconos y texto
Puedes crear una barra con varios elementos, cada uno compuesto por un icono y un texto, usando una combinación de `Row` y `Column`:

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Barra de iconos')),
        body: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Column(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Icon(Icons.call, color: Colors.blue),
                  SizedBox(height: 8),
                  Text('Llamar'),
                ],
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Icon(Icons.near_me, color: Colors.blue),
                  SizedBox(height: 8),
                  Text('Ruta'),
                ],
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Icon(Icons.share, color: Colors.blue),
                  SizedBox(height: 8),
                  Text('Compartir'),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 06d3897c01bad9b4fdb12c7bda26f5fe

[list]
Puedes usar `Icon` para mostrar iconos y personalizar su color.
Combina `Row` y `Column` para crear layouts complejos y reutilizables.
`mainAxisAlignment` y `mainAxisSize` te ayudan a controlar la alineación y el tamaño de los elementos.
Esta técnica es la base para construir barras de acciones, menús y composiciones visuales en Flutter.
[endlist]

