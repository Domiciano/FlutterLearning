[t] ScrollView
En esta lección aprenderás cómo habilitar el scroll vertical en Flutter cuando el contenido supera el alto de la pantalla, usando `SingleChildScrollView`.
[v] 3ojpJOTQhos
[st] ¿Por qué usar ScrollView?
Cuando tienes muchos elementos en pantalla (imágenes, textos, widgets variados) y el contenido supera el alto disponible, Flutter muestra un error de overflow. Para solucionarlo, debes envolver el contenido en un widget que permita desplazamiento (scroll).

[st] Ejemplo: SingleChildScrollView
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
        appBar: AppBar(title: const Text('ScrollView')),
        body: SingleChildScrollView(
          child: Column(
            children: List.generate(
              10,
              (index) => Padding(
                padding: const EdgeInsets.all(16),
                child: Image.network(
                  'https://yt3.googleusercontent.com/2__G-ckA66-4JgXPlHTGZvg8CoUIgDU6qYFnJqW-AsVeJvBRT4hCjXz4XMOjIqm4m7v431lT=s900-c-k-c0x00ffffff-no-rj',
                  width: 200,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] da1a3dcce4648b333339ac8e07890cc2

[list]
Usa `SingleChildScrollView` cuando tienes una columna de widgets variados y necesitas scroll.
Si tienes una lista grande de elementos similares (como posts, chats, etc.), usa `ListView` para mejor rendimiento.
El scroll puede ser vertical (por defecto) o horizontal (`scrollDirection: Axis.horizontal`).
Evita anidar varios scrolls para no tener problemas de interacción.
[endlist]
