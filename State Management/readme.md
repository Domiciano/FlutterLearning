<img width="256" src="https://www.icesi.edu.co/launiversidad/images/La_universidad/logo_icesi.png">

# Flutter

## App
```
import 'package:flutter/material.dart';
import 'ui/start_screen.dart';

class App extends StatelessWidget {
  const App({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}


```


Para poder gestionar el estado use una clase BloC.

StreamController -> va en BloC

StreamBuilder -> es un widget

Provider -> es un widget



Recuerda que si estás utilizando el patrón BloC en conjunto con StreamBuilder, el StreamBuilder se encarga automáticamente de cerrar el StreamController cuando se desconecta del Stream. Sin embargo, es importante cerrar explícitamente el StreamController cuando ya no lo necesites para liberar los recursos adecuadamente.




## Usando StreamController.add() y StreamBuilder

### BloC

```
import 'dart:async';

class StartScreenBloc{

  int _count = 0;
  final StreamController<int> _countController = StreamController<int>();
  Stream<int> get countStream => _countController.stream;

  // Método para actualizar los datos y emitirlos a través del StreamController
  void increaseCounter() {
    _count++;
    _countController.add(_count);
  }


  // Método para cerrar el StreamController al finalizar
  void dispose() {
    _countController.close();
  }

}
```
Para agregar datos se puede usar o bien _countController.add(_count); o _countController.sink.add(_count);. Es lo mismo
Para poner un valor inicial puede usar el constructor del bloc

### Vista
```
import 'package:flutter/material.dart';
import '../blocs/start_screen_bloc.dart';

class MyHomePage extends StatelessWidget {
  MyHomePage({super.key, required this.title});
  final String title;

  final StartScreenBloc bloc = StartScreenBloc();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(title),
      ),
      body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                StreamBuilder(stream:bloc.countStream, 
                builder: (context,snap){
                  if(snap.hasData){
                    return Text("${snap.data} veces", style: Theme.of(context).textTheme.headlineMedium);
                  }else{
                    return Text("0", style: Theme.of(context).textTheme.headlineMedium);
                  }
                })
                ,
              ],
            ),
          ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          bloc.increaseCounter();
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }


}

```

## BehaviorSubject
Es un sustituto de StreamController que recuerda el último valor emitido.

###Bloc
```
import 'dart:async';
import 'package:rxdart/rxdart.dart';


class StartScreenBloc{

  final BehaviorSubject<int> _countSubject = BehaviorSubject<int>.seeded(0);
  Stream<int> get countStream => _countSubject.stream;

  void increaseCounter() {
    _countSubject.sink.add(_countSubject.value+1);
  }

  void dispose() {
    _countSubject.drain();
  }

}
```

### Vista
```
import 'package:flutter/material.dart';
import '../blocs/start_screen_bloc.dart';

class MyHomePage extends StatelessWidget {
  MyHomePage({super.key, required this.title});
  final String title;

  final StartScreenBloc bloc = StartScreenBloc();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(title),
      ),
      body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                StreamBuilder(stream:bloc.countStream, 
                builder: (context,snap){
                  if(snap.hasData){
                    return Text("${snap.data} veces", style: Theme.of(context).textTheme.headlineMedium);
                  }else{
                    return Text("0", style: Theme.of(context).textTheme.headlineMedium);
                  }
                })
                ,
              ],
            ),
          ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          bloc.increaseCounter();
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }


}
```


## Providers

### Bloc
```
import 'package:flutter/material.dart';

class StartScreenBloc with ChangeNotifier{

  int _count = 0;

  int get count => _count;
  
  void increaseCounter() {
    _count++;
    notifyListeners();
  }

}
```



### App
Para usar los providers se requiere registrar cada BloC en el conjunto de providers de la aplicación
```
import 'package:flutter/material.dart';
import 'package:miapp/src/blocs/start_screen_bloc.dart';
import 'package:provider/provider.dart';
import 'src/app.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider<StartScreenBloc>(create: (context) => StartScreenBloc()),
      ],
      child: const App(),
    ),
  );
}
```
O
```
import 'package:flutter/material.dart';
import 'package:miapp/src/blocs/start_screen_bloc.dart';
import 'package:provider/provider.dart';
import 'src/app.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider.value(value: StartScreenBloc()),
      ],
      child: const App(),
    ),
  );
}
```

### Vista

```
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../blocs/start_screen_bloc.dart';

class MyHomePage extends StatelessWidget {
  MyHomePage({super.key, required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    final bloc = Provider.of<StartScreenBloc>(context);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(title),
      ),
      body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Consumer<StartScreenBloc>(builder: (context, value, child){
                  return Text("${value.count} veces", style: Theme.of(context).textTheme.headlineMedium);
                })
                ,
              ],
            ),
          ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          bloc.increaseCounter();
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```



!!! Además de provider, existen otras bibliotecas populares de gestión de estado en Flutter que se pueden utilizar para implementar el patrón BloC, como GetX, Riverpod, MobX, flutter_bloc (de Google), entre otras. Estas bibliotecas proporcionan diferentes enfoques y características para la gestión de estado y la comunicación entre componentes.

## Google blocs

### Clase Equitable

Poder comparar objetos en Dart a menudo implica tener que sobrescribir el operador `==` y `hashCode`.

No solo es verboso y tedioso, sino que no hacerlo puede conducir a un código ineficiente que no se comporta como esperamos.

De forma predeterminada, `==` devuelve `true` si dos objetos son la misma instancia.

Digamos que tenemos la siguiente clase:

```dart
class Person {
  const Person(this.name);

  final String name;
}
```

Podemos crear instancias de `Person` de la siguiente manera:

```dart
void main() {
  final Person bob = Person("Bob");
}
```

Más tarde, si intentamos comparar dos instancias de `Person` ya sea en nuestro código de producción o en nuestras pruebas, nos encontraremos con un problema.

```dart
print(bob == Person("Bob")); // false
```

Para obtener más información sobre esto, puedes consultar la Documentación oficial de Dart.

Para poder comparar dos instancias de `Person`, necesitamos cambiar nuestra clase para sobrescribir `==` y `hashCode`, de la siguiente manera:

```dart
class Person {
  const Person(this.name);

  final String name;

  @override
  bool operator ==(Object other) =>
    identical(this, other) ||
    other is Person &&
    runtimeType == other.runtimeType &&
    name == other.name;

  @override
  int get hashCode => name.hashCode;
}
```

Ahora, si ejecutamos el siguiente código nuevamente:

```dart
print(bob == Person("Bob")); // true
```

Será capaz de comparar diferentes instancias de `Person`.

Puedes ver cómo esto puede convertirse rápidamente en una molestia al lidiar con clases complejas. ¡Aquí es donde entra en juego Equatable!

### ¿Qué hace Equatable?
Equatable sobrescribe `==` y `hashCode` por ti, para que no tengas que perder tiempo escribiendo mucho código repetitivo.

Existen otros paquetes que generan el código repetitivo por ti; sin embargo, aún debes ejecutar el paso de generación de código, lo cual no es ideal.

Con Equatable no se necesita generación de código y podemos centrarnos más en escribir aplicaciones increíbles y menos en tareas mundanas.




## BloC pattern


Para una aplicación que tenga registro, login, una pantalla en la que puedo ver mi perfil, otra pantalla en la que puedo hacer post tipo facebook pero también ver los post de los demás usuario. El usuario puede interactuar con cada post dando like o comentando y el usuario puede ver todos los comentarios de todos los post.

Se recomienda usar esta estructura de carpetas
´´´
- lib
  - blocs
    - authentication
      - authentication_bloc.dart
      - authentication_event.dart
      - authentication_state.dart
    - user_profile
      - user_profile_bloc.dart
      - user_profile_event.dart
      - user_profile_state.dart
    - post
      - post_bloc.dart
      - post_event.dart
      - post_state.dart
    - comment
      - comment_bloc.dart
      - comment_event.dart
      - comment_state.dart
´´´

Que como nota, se trata de una división por entidad, donde se va a encapsular cada evento y estado por cada entidad. De modo que las piezas de la aplicación consumen la información según sea necesario.


## 
