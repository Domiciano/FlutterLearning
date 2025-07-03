[t] Tipos opcionales y null safety

[p]
En Dart, los tipos opcionales te permiten manejar valores que pueden ser `null`. El sistema de null safety ayuda a prevenir errores comunes.

[st] Tipos opcionales básicos

[c:dart]
void main() {
  // Variable que puede ser null
  String? nombre = null;
  print(nombre); // null
  
  // Asignar un valor
  nombre = 'Ana';
  print(nombre); // Ana
  
  // Variable que no puede ser null
  String apellido = 'García'; // Error si intentas asignar null
  print(apellido);
}
[end]
[trycode] f0fd4d9f795c46529176e86bc4287aaf

[p]
Usa `?` después del tipo para indicar que puede ser null.

[p]
Sin `?`, la variable nunca puede ser null.

[st] Verificar si es null

[c:dart]
void main() {
  String? email = null;
  
  // Verificar si es null
  if (email != null) {
    print('Email: $email');
  } else {
    print('No hay email');
  }
  
  // Asignar email
  email = 'ana@ejemplo.com';
  
  if (email != null) {
    print('Email: $email');
  } else {
    print('No hay email');
  }
}
[end]
[trycode] 66405bd35f0f6d4afe60328ba63e2da9

[p]
Usa `!= null` para verificar si una variable tiene valor.

[p]
Solo después de verificar puedes usar la variable sin `?`.

[st] Operador de acceso seguro (?. )

[c:dart]
void main() {
  String? texto = null;
  
  // Acceso seguro - no causa error si es null
  print(texto?.length); // null
  
  texto = 'Hola';
  print(texto?.length); // 4
  
  // Sin acceso seguro causaría error
  // print(texto.length); // Error si texto es null
}
[end]
[trycode] 778d63184ff6c07404bdaecf4171b330

[p]
El operador `?.` accede a propiedades solo si el valor no es null.

[p]
Si es null, retorna null en lugar de causar error.

[st] Operador de coalescencia nula (??)

[c:dart]
void main() {
  String? nombre = null;
  String? apellido = 'García';
  
  // Usar valor por defecto si es null
  String nombreCompleto = nombre ?? 'Anónimo';
  print(nombreCompleto); // Anónimo
  
  String apellidoCompleto = apellido ?? 'Sin apellido';
  print(apellidoCompleto); // García
  
  // También funciona con expresiones
  String mensaje = nombre ?? apellido ?? 'Sin nombre';
  print(mensaje); // García
}
[end]
[trycode] cebc63befd4e7eb207bb23b20187e7f2

[p]
El operador `??` proporciona un valor por defecto si la variable es null.

[p]
Puedes encadenar múltiples `??` para fallbacks.

[st] Asignación de coalescencia nula (??=)

[c:dart]
void main() {
  String? nombre = null;
  
  // Solo asigna si la variable es null
  nombre ??= 'Juan';
  print(nombre); // Juan
  
  // No cambia si ya tiene valor
  nombre ??= 'Pedro';
  print(nombre); // Juan (no cambió)
  
  String? edad = null;
  edad ??= '25';
  print(edad); // 25
}
[end]
[trycode] 3aee48062336caac7725347bcd0bf2c4

[p]
El operador `??=` asigna un valor solo si la variable es null.

[p]
Es útil para inicializar variables opcionales. 