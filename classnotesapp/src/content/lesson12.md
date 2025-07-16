[t] Futures y funciones async

[p]
Un `Future` representa un valor que estará disponible en el futuro, normalmente como resultado de una operación asíncrona (por ejemplo, una petición a internet).

[st] Función que retorna un Future

[c:dart]
Future<String> getMessage() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Hello from the future!';
}

void main() async {
  print('Waiting...');
  String message = await getMessage();
  print(message);
}
[end]
[trycode] 9ac0073d9828ba3ec7dcd93478b7b98a

[p]
La palabra clave `async` permite usar `await` dentro de la función para esperar el resultado de operaciones asíncronas.

[st] Manejo de errores con Future

[c:dart]
Future<int> divide(int a, int b) async {
  if (b == 0) throw Exception('Cannot divide by zero');
  return a ~/ b;
}

void main() async {
  try {
    int result = await divide(10, 2);
    print(result);
  } catch (e) {
    print('Error: $e');
  }
}
[end]
[trycode] f31c9df7ce0bbdac540547a9f08506a0

[p]
Puedes usar `try-catch` para manejar errores en funciones asíncronas. 