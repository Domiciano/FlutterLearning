[t] Auth y DB
Lo que debemos hacer es que los usuarios que registramos, deben estar realmente en dos registros de los servicios de supabase.

El primero es `Auth` que ya lo vimos.

Ahora, vamos a ver qué debemos hacer para enviar el resto de datos que levantamos en el proceso de registro.

[st] Tabla Profile
Es una tabla como cualquier otra, pero lleva una referencia al UID de la tabla de Authentitcation

[code:sql]
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);
[endcode]
De esta manera, si se elimina un usuario de Auth, se elimina su registro dentro de nuestra nueva tabla

Ahora su función será la de desplegar esto a lo largo de las capas. Analícelo antes de comenzar a implementar

[st] Row lever security policy
Si su interés es hacer una tabla muy segura donde sólo el usuario dueño del registro sea quien puede ver su información, puede anexar esta RLS policy
[code:sql]
-- Activa Row Level Security en la tabla
alter table profiles enable row level security;

-- Permitir SELECT solo al dueño de la fila
create policy "Users can view their own profile"
on profiles for select
using (auth.uid() = id);

-- Permitir UPDATE solo al dueño de la fila
create policy "Users can update their own profile"
on profiles for update
using (auth.uid() = id);

-- Permitir INSERT solo al dueño de la fila (cuando coincide con su UID)
create policy "Users can insert their own profile"
on profiles for insert
with check (auth.uid() = id);
[endcode]

Luego, puede modelar la clase Profile
[code:dart]
class Profile {
  final String id;
  final String? username;
  final String? fullName;
  final String? avatarUrl;
  final DateTime createdAt;

  Profile({
    required this.id,
    this.username,
    this.fullName,
    this.avatarUrl,
    required this.createdAt,
  });

  /// Para enviar a Supabase
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'full_name': fullName,
      'avatar_url': avatarUrl,
      'created_at': createdAt.toIso8601String(),
    };
  }

  /// Para leer desde Supabase
  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      id: json['id'] as String,
      username: json['username'] as String?,
      fullName: json['full_name'] as String?,
      avatarUrl: json['avatar_url'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }
}
[endcode]
.