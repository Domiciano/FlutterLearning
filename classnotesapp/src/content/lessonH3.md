[t] Enviar datos a base de datos
Vamos a supabase y creamos el modelo de datos. Nos vamosa basar por supuesto en la [link] (Guía de Supabase para Flutter) https://supabase.com/docs/reference/dart/select

[code:sql]
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  created_at timestamp with time zone default now()
);
[endcode]

Luego, podemos crear un modelo de datos correspondiente. Note cómo le podemos valor por defecto a `createdAt`.
[code:dart]
class Post {
  final String id;
  final String title;
  final String content;
  final DateTime createdAt;

  Post({
    required this.id,
    required this.title,
    required this.content,
    required this.createdAt,
  });

  /// Para enviar a Supabase
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'created_at': createdAt.toIso8601String(),
    };
  }

  /// Para leer desde Supabase
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as String,
      title: json['title'] as String,
      content: json['content'] as String,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }
}
[endcode]


Se puede enviar asi
[code:dart]
import 'package:supabase_flutter/supabase_flutter.dart';

final supabase = Supabase.instance.client;

Future<void> createPost(Post post) async {
  final response = await supabase.from('posts').insert(post.toJson());

  if (response.error != null) {
    throw Exception('Error insertando post: ${response.error!.message}');
  }
}
[endcode]

Y posteriormente se pueden recuperar asi

[code:dart]
Future<List<Post>> getPosts() async {
  final response = await supabase.from('posts').select();

  if (response.error != null) {
    throw Exception('Error consultando posts: ${response.error!.message}');
  }
  
  final data = response.data as List;
  return data.map((e) => Post.fromJson(e)).toList();
}
[endcode]

[list]
Definir el modelo Dart con toJson() y fromJson().
Crear la tabla en Supabase con SQL.
Usar supabase.from('tabla').insert() para enviar.
Usar supabase.from('tabla').select() para leer.
[endlist]

[st] Paginacion
Si quiero los primeros 10 registros
[code:dart]
final response = await supabase
    .from('posts')
    .select()
    .order('created_at', ascending: false)
    .range(0, 9);
[endcode]
Si quiero los segundos 10 registros
[code:dart]
final response = await supabase
    .from('posts')
    .select()
    .order('created_at', ascending: false)
    .range(10, 19);
[endcode]

[st] Filtros
[code:dart]
final response = await supabase
    .from('profiles')
    .select()
    .eq('username', 'alfredo123');
[endcode]

Así como `eq` (equals), están los de mayor / menor (gt, gte, lt, lte)
[code:dart]
final res = await supabase
    .from('posts')
    .select()
    .gt('likes', 100); // likes > 100
[endcode]

También el operador `LIKE`
[code:dart]
final res = await supabase
    .from('profiles')
    .select()
    .like('full_name', '%Rincón%'); // contiene "Rincón"
[endcode]

O coincidencia dentro de una lista de valores
[code:dart]
final res = await supabase
    .from('profiles')
    .select()
    .inFilter('username', ['pepe', 'maria', 'juan']);
[endcode]
.