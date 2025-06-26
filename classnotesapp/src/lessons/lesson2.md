# Principios de Diagramación en Flutter

[p]
En Flutter, `Row` y `Column` son los widgets base
para ubicar elementos en una línea horizontal o vertical, respectivamente.


[v] dUMqg_JQsEc | Introducción a Flutter

[i] logo.svg | Logo de Flutter

[c:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: Text('Hello, World!')
        )
      ),
    );
  }
};

[dartpad] 2ce0f8a930b04533ba94b4f4f525e7fc


[p]
En Flutter, `Row` y `Column` son los widgets base
para ubicar elementos en una línea horizontal o vertical, respectivamente.

[v] dUMqg_JQsEc | Introducción a Flutter

[i] logo.svg | Logo de Flutter

[dartpad] 2ce0f8a930b04533ba94b4f4f525e7fc

[c:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: Text('Hello, World!')
        )
      ),
    );
  }
};