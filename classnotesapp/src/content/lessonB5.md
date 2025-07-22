[t] Streams y funciones async*
Un `Stream` es una secuencia de valores que llegan en el tiempo. Es útil para manejar eventos, datos en tiempo real o flujos continuos.

[st] Crear un Stream con async*

[code:dart]
Stream<int> countTo(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

void main() async {
  await for (int value in countTo(3)) {
    print(value);
  }
}
[endcode]
[trycode] f46f338431a59e088e7f637a2f82201e

La función `async*` permite usar `yield` para emitir valores al stream.

[st] Escuchar un Stream con listen
[code:dart]
Stream<String> messages() async* {
  yield 'Hello';
  await Future.delayed(Duration(seconds: 1));
  yield 'How are you?';
}

void main() {
  messages().listen((message) {
    print(message);
  });
}
[endcode]
[trycode] 3cb0f5348a515f52e2eb1b696fa9b005
Puedes escuchar un stream usando `await for` o el método `listen`. 