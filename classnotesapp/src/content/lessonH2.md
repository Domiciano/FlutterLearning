[t] Inicio de Sesión con Supabase y Flutter
Ahora que ya sabemos cómo registrar usuarios, es momento de aprender a autenticarlos en nuestra aplicación Flutter utilizando Supabase.

[st] Creación de la Pantalla de Login
La pantalla de inicio de sesión es muy similar a la de registro. Necesitaremos dos campos de texto (email y contraseña) y un botón para enviar la información.

Para este punto, realiza esta pantalla de una forma sencilla

[st] Inicio de Sesión
El método `signInWithPassword` del cliente de Supabase es el que nos permite autenticar a un usuario con su correo y contraseña.

[code:dart]
Future<void> _signIn() async {
  try {
    final AuthResponse res = await supabase.auth.signInWithPassword(
      email: _emailController.text.trim(),
      password: _passwordController.text.trim(),
    );
    print(res.user);
    print(res.session);
  } on AuthException catch (error) {
    print(error);
  } catch (error) {
    print(error);
  }
}
[endcode]

[st] Cerrar Sesión
Para cerrar la sesión de un usuario, simplemente llama al método `signOut`.

[code:dart]
await supabase.auth.signOut();
[endcode]

Al llamar a `signOut`, el listener `onAuthStateChange` detectará el cambio y podrás redirigir al usuario a la pantalla de inicio de sesión.

[st] Current user
Si ya estás autenticado, siempre puedes acceder al ID usando
[code:dart]
final user = supabase.auth.currentUser;
[endcode]
Si ese usuario es diferente de null, es porque hay un usuario con la sesión iniciada cuyo id se encuentra en `user.id`