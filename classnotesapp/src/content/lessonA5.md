[t] Tipos opcionales y null safety
En Dart, los tipos opcionales te permiten manejar valores que pueden ser `null`. El sistema de null safety ayuda a prevenir errores comunes.
[st] Tipos opcionales básicos
[code:dart]
void main() {
  // Variable that can be null
  String? name = null;
  print(name); // null
  
  // Assign a value
  name = 'Ana';
  print(name); // Ana
  
  // Variable that cannot be null
  String lastName = 'García'; // Error if you try to assign null
  print(lastName);
}
[endcode]
[trycode] f0fd4d9f795c46529176e86bc4287aaf
Usa `?` después del tipo para indicar que puede ser null. Sin `?`, la variable nunca puede ser null.

[st] Verificar si es null
[code:dart]
void main() {
  String? email = null;
  
  // Check if it is null
  if (email != null) {
    print('Email: $email');
  } else {
    print('No email');
  }
  
  // Assign email
  email = 'ana@example.com';
  
  if (email != null) {
    print('Email: $email');
  } else {
    print('No email');
  }
}
[endcode]
[trycode] 66405bd35f0f6d4afe60328ba63e2da9
Usa `!= null` para verificar si una variable tiene valor. Solo después de verificar puedes usar la variable sin `?`.

[st] Operador de acceso seguro (?. )
[code:dart]
void main() {
  String? text = null;
  
  // Safe access - does not cause error if null
  print(text?.length); // null
  
  text = 'Hello';
  print(text?.length); // 4
  
  // Without safe access would cause error
  // print(text.length); // Error if text is null
}
[endcode]
[trycode] 778d63184ff6c07404bdaecf4171b330
El operador `?.` accede a propiedades solo si el valor no es null. Si es null, retorna null en lugar de causar error.

[st] Operador de coalescencia nula (??)
[code:dart]
void main() {
  String? name = null;
  String? lastName = 'García';
  
  // Use default value if null
  String fullName = name ?? 'Anonymous';
  print(fullName); // Anonymous
  
  String fullLastName = lastName ?? 'No last name';
  print(fullLastName); // García
  
  // Also works with expressions
  String message = name ?? lastName ?? 'No name';
  print(message); // García
}
[endcode]
[trycode] cebc63befd4e7eb207bb23b20187e7f2
El operador `??` proporciona un valor por defecto si la variable es null. Puedes encadenar múltiples `??` para fallbacks.

[st] Asignación de coalescencia nula (??=)
[code:dart]
void main() {
  String? name = null;
  
  // Only assigns if the variable is null
  name ??= 'Juan';
  print(name); // Juan
  
  // Does not change if it already has a value
  name ??= 'Pedro';
  print(name); // Juan (did not change)
  
  String? age = null;
  age ??= '25';
  print(age); // 25
}
[endcode]
[trycode] 3aee48062336caac7725347bcd0bf2c4
El operador `??=` asigna un valor solo si la variable es null. Es útil para inicializar variables opcionales. 