[t] Flutter


[st] Ejemplo de subtitulo


[p]
En Flutter, `Row` y `Column` son los widgets base
pavertical, respectivamente.

[p]
Bienvenido al curso de Aplicaciones móviles




[i] https://innovance.com.tr/wp-content/uploads/2024/10/flutter-hero.jpg | Logo oficial

[icon] https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Google-flutter-logo.svg/2560px-Google-flutter-logo.svg.png | Logo sin bordes


[v] dUMqg_JQsEc | Introducción a Flutter

[i] logo.svg | Logo de Icesi


[c:jsx]
function MyButton() {
  return (
    <button>Soy un botón</button>
  );
}

[c:http]
GET /items/1
[c:sql]
SELECT name, age 
FROM users 
WHERE age > 18 
ORDER BY name ASC;
[c:java]
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
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