[t] Clases y objetos en Dart

[p]
Las clases son plantillas para crear objetos. En Dart, todo es un objeto, y las clases te permiten definir propiedades y comportamientos.

[st] Crear una clase básica

[c:dart]
void main() {
  // Crear una instancia de la clase
  Persona persona1 = Persona('Ana', 25);
  persona1.saludar();
  
  Persona persona2 = Persona('Carlos', 30);
  persona2.saludar();
}

class Persona {
  String nombre;
  int edad;
  
  // Constructor
  Persona(this.nombre, this.edad);
  
  // Método
  void saludar() {
    print('Hola, soy $nombre y tengo $edad años');
  }
}
[end]
[trycode] e930ec503d90ef658887d57ace23df94

[p]
Las clases definen propiedades (variables) y métodos (funciones).

[p]
El constructor `Persona(this.nombre, this.edad)` inicializa las propiedades.

[st] Getters y setters

[c:dart]
void main() {
  Producto producto = Producto('Laptop', 1200.0);
  
  print(producto.nombre); // Laptop
  print(producto.precio); // 1200.0
  print(producto.precioConIVA); // 1428.0
  
  producto.precio = 1000.0; // Usar setter
  print(producto.precioConIVA); // 1190.0
}

class Producto {
  String nombre;
  double _precio; // Propiedad privada
  
  Producto(this.nombre, this._precio);
  
  // Getter
  double get precio => _precio;
  double get precioConIVA => _precio * 1.19;
  
  // Setter
  set precio(double valor) {
    if (valor > 0) {
      _precio = valor;
    }
  }
}
[end]
[trycode] bc1e77ba3975bc12df21b88f17af0ac3

[p]
Los getters permiten acceder a propiedades calculadas.

[p]
Los setters permiten validar datos antes de asignarlos.

[p]
Las propiedades privadas empiezan con `_`.

[st] Herencia

[c:dart]
void main() {
  Estudiante estudiante = Estudiante('María', 20, 'Ingeniería');
  estudiante.saludar();
  estudiante.estudiar();
  
  Profesor profesor = Profesor('Dr. García', 45, 'Matemáticas');
  profesor.saludar();
  profesor.enseñar();
}

class Persona {
  String nombre;
  int edad;
  
  Persona(this.nombre, this.edad);
  
  void saludar() {
    print('Hola, soy $nombre');
  }
}

class Estudiante extends Persona {
  String carrera;
  
  Estudiante(String nombre, int edad, this.carrera) : super(nombre, edad);
  
  void estudiar() {
    print('$nombre está estudiando $carrera');
  }
}

class Profesor extends Persona {
  String materia;
  
  Profesor(String nombre, int edad, this.materia) : super(nombre, edad);
  
  void enseñar() {
    print('$nombre enseña $materia');
  }
}
[end]
[trycode] 20a0a0bdf3a2f03a8aa519536fe40af2

[p]
`extends` permite heredar de otra clase.

[p]
`super()` llama al constructor de la clase padre.

[p]
Cada clase puede tener métodos específicos.

[st] Constructores nombrados

[c:dart]
void main() {
  // Constructor por defecto
  Vehiculo auto1 = Vehiculo('Toyota', 'Corolla');
  
  // Constructor nombrado
  Vehiculo auto2 = Vehiculo.electrico('Tesla', 'Model 3');
  Vehiculo auto3 = Vehiculo.usado('Ford', 'Focus', 2018);
  
  auto1.mostrarInfo();
  auto2.mostrarInfo();
  auto3.mostrarInfo();
}

class Vehiculo {
  String marca;
  String modelo;
  String? tipo;
  int? año;
  
  // Constructor por defecto
  Vehiculo(this.marca, this.modelo);
  
  // Constructor nombrado para vehículos eléctricos
  Vehiculo.electrico(this.marca, this.modelo) {
    tipo = 'Eléctrico';
  }
  
  // Constructor nombrado para vehículos usados
  Vehiculo.usado(this.marca, this.modelo, this.año);
  
  void mostrarInfo() {
    String info = '$marca $modelo';
    if (tipo != null) info += ' ($tipo)';
    if (año != null) info += ' - Año $año';
    print(info);
  }
}
[end]
[trycode] 85b89338cd1dec1644ef3814e11d0525

[p]
Los constructores nombrados permiten diferentes formas de crear objetos.

[p]
Son útiles para casos de uso específicos con diferentes parámetros. 