[t] TextField

El widget `TextField` es fundamental para permitir a los usuarios introducir texto en tu aplicación. Es altamente personalizable y soporta diversas configuraciones para la entrada de datos.

[st] Uso Básico

El uso más simple de un `TextField` es sin ninguna configuración adicional. Esto creará un campo de texto básico.

[code:dart]
TextField()
[endcode]

[st] Controladores de Texto (TextEditingController)

Para obtener el texto introducido por el usuario o para establecer el texto programáticamente, se utiliza un `TextEditingController`. Es una buena práctica asociar un controlador a cada `TextField`.

[code:dart]
// En un StatefulWidget
class MyFormState extends State<MyForm> {
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose(); // Liberar recursos del controlador
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      onChanged: (text) {
        print('Texto actual: $text');
      },
    );
  }
}
[endcode]

[st] Decoración del Campo de Texto (InputDecoration)

La propiedad `decoration` de `TextField` acepta un objeto `InputDecoration`, que permite añadir etiquetas, texto de ayuda, iconos, bordes y más, para mejorar la experiencia de usuario.

[st] Etiqueta (labelText)

`labelText` muestra una etiqueta flotante que se anima cuando el campo está en foco.

[code:dart]
TextField(
  decoration: InputDecoration(
    labelText: 'Nombre de Usuario',
  ),
)
[endcode]

[st] Borde (border)

Puedes añadir diferentes tipos de bordes, como `OutlineInputBorder` para un borde rectangular.

[code:dart]
TextField(
  decoration: InputDecoration(
    labelText: 'Contraseña',
    border: OutlineInputBorder(),
  ),
  obscureText: true, // Para campos de contraseña
)
[endcode]

[st] Iconos (prefixIcon, suffixIcon)

`prefixIcon` y `suffixIcon` permiten añadir iconos al inicio o al final del campo de texto.

[code:dart]
TextField(
  decoration: InputDecoration(
    labelText: 'Buscar',
    prefixIcon: Icon(Icons.search),
    suffixIcon: Icon(Icons.clear),
  ),
)
[endcode]

[st] Texto de Ayuda (helperText, hintText)

*   `helperText`: Texto que aparece debajo del campo de texto.
*   `hintText`: Texto que aparece dentro del campo cuando está vacío.

[code:dart]
TextField(
  decoration: InputDecoration(
    hintText: 'Introduce tu email',
    helperText: 'Nunca compartiremos tu email.',
  ),
)
[endcode]

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional que demuestra cómo usar el widget `TextField` con controladores y diversas decoraciones.

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
      title: 'Ejemplo TextField Widget',
      home: MyTextFieldScreen(),
    );
  }
}

class MyTextFieldScreen extends StatefulWidget {
  const MyTextFieldScreen({super.key});

  @override
  State<MyTextFieldScreen> createState() => _MyTextFieldScreenState();
}

class _MyTextFieldScreenState extends State<MyTextFieldScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Widget TextField')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Nombre Completo',
                hintText: 'Escribe tu nombre aquí',
                prefixIcon: Icon(Icons.person),
                border: OutlineInputBorder(),
              ),
              onChanged: (text) {
                print('Nombre: $text');
              },
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(
                labelText: 'Correo Electrónico',
                hintText: 'ejemplo@dominio.com',
                suffixIcon: Icon(Icons.email),
                helperText: 'Introduce un correo válido',
                border: UnderlineInputBorder(),
              ),
              onChanged: (text) {
                print('Email: $text');
              },
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Datos Ingresados'),
                    content: Text(
                      'Nombre: ${_nameController.text}\nEmail: ${_emailController.text}',
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('OK'),
                      ),
                    ],
                  ),
                );
              },
              child: const Text('Mostrar Datos'),
            ),
          ],
        ),
      ),
    );
  }
}
[endcode]
.