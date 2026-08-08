# Laboratorio 2: Icesi Beats
<!-- tags: Navigator.pushNamed, pushNamedAndRemoveUntil, Navigator.pop, ModalRoute,
     arguments, rutas nombradas, BottomNavigationBar, Screen vs Page, copyWith,
     TextEditingController, el campo de texto se borra, dispose -->

En este laboratorio va a construir el flujo completo de una aplicación de música:
el usuario entra, la app le hace tres preguntas para conocerlo, le muestra un resumen
y lo deja en la pantalla principal.

El foco está en dos cosas: **navegación** y **entrada de datos del usuario**. Los
componentes ya vienen construidos — su trabajo es *ensamblarlos* y cablear la
navegación.

## La distinción entre `Screen` y `Page`

Esta es la idea que organiza todo el laboratorio y es obligatoria.

|  | **Screen** | **Page** |
|---|---|---|
| ¿Qué es? | Una pantalla completa a la que se **navega** | Un pedazo de UI **hosteado** por una Screen |
| Widget raíz | **`Scaffold`** | `Column` o `SingleChildScrollView` — **nunca `Scaffold`** |
| ¿Cómo aparece? | `Navigator.pushNamed(...)` | Cambiando un índice con `setState` |
| Carpeta | `lib/screens/` | `lib/pages/` |

Analogía Android: **Screen ≈ Activity**, **Page ≈ Fragment**.

En esta aplicación la convención aparece **dos veces**:

- La `OnboardingScreen` hostea los tres pasos y el resumen.
- La `MainScreen` hostea los tres tabs del `BottomNavigationBar`.

En los dos casos el estado vive en la Screen anfitriona, y las Pages solo reciben
datos por constructor y reportan hacia arriba con un callback.

Al terminar, el proyecto debe tener **exactamente 4 `Scaffold`**: `LoginScreen`,
`OnboardingScreen`, `MainScreen` y `EditProfileScreen`. Ninguno en `lib/pages/`.

## Estructura del proyecto

```plain
lib/
├── main.dart              // MaterialApp + tabla de rutas
├── theme/app_theme.dart   // AppColors + buildTheme()
├── models/                // MusicProfile, con copyWith
├── components/            // los 13 componentes, ya hechos
├── screens/               // las 4 Screens
└── pages/                 // las 7 Pages
```

## Punto de partida

Clone el repositorio base del laboratorio. Trae **todos los componentes construidos**
y tres pantallas resueltas que le sirven de molde:

- `lib/screens/login_screen.dart` — cómo una Screen guarda lo que escribe el usuario
  y manda un dato a la siguiente pantalla.
- `lib/screens/onboarding_screen.dart` — **el molde de Screen anfitriona**: hostea
  cuatro Pages, guarda el índice y el perfil, y las Pages le reportan con un callback.
- `lib/pages/step1_page.dart` — **el molde de paso**.
- `lib/pages/home_page.dart` — el molde de una Page de contenido.

El resto de archivos trae un `TODO` con el número de la parte que le corresponde.

## El flujo

```plain
Login ──pushNamed('/onboarding', arguments: correo)──►  un String simple
  │
  ├─ OnboardingScreen   (una Screen, cuatro Pages)
  │     Step1Page ──onContinue(profile.copyWith(...))──► Step2Page
  │     Step2Page ──onContinue(profile.copyWith(...))──► Step3Page
  │     Step3Page ──onContinue(profile.copyWith(...))──► SummaryPage
  │     SummaryPage ──pushNamedAndRemoveUntil('/main', (route) => false)──►
  │
  └─ MainScreen         (una Screen, tres Pages)
        BottomNavigationBar: Inicio · Playlist · Perfil
        ProfilePage ──await pushNamed('/edit-profile')──►  pop(context, perfilNuevo)
```

El `MusicProfile` es **un solo objeto que se va llenando**. Cada paso lo recibe, le
agrega lo suyo con `copyWith` y lo reporta hacia arriba. Cuando llega a la
`MainScreen`, ya trae todo lo que el usuario respondió.

---

# Parte 1: las rutas

Archivo: `lib/main.dart`

Reemplace `home:` por `initialRoute:` y `routes:`. Recuerde que cuando se usa
`routes`, **no** se declara `home`, y la ruta `'/'` es la pantalla inicial.

```plain
'/'             -> LoginScreen()
'/onboarding'   -> OnboardingScreen()
'/main'         -> MainScreen()
'/edit-profile' -> EditProfileScreen()
```

Son solo cuatro rutas porque los tres pasos y el resumen son `Page`, no `Screen`.

Mientras no haga esto, el botón `Entrar` del login falla: está navegando a una ruta
que todavía no existe.

![Imagen](lab2Login.png "frame60")

# Parte 2: el paso 2 del onboarding

Archivo: `lib/pages/step2_page.dart` — use como molde `step1_page.dart`, que ya está
resuelto.

El patrón de todos los pasos es el mismo: **RECIBIR → COMPLETAR → REPORTAR**. Así se
ve el Paso 1, que ya viene resuelto:

![Imagen](lab2Step1.png "frame60")

Y esto es lo que usted tiene que construir:

![Imagen](lab2Step2.png "frame60")

1. Un `StepHeader` con `step: 2`, título `¿Qué te mueve?` y subtítulo
   `Con esto armamos tus recomendaciones`.
2. Un `LabeledTextField` con label `Artista favorito` y hint `Bad Bunny`.
3. Debajo, un `Wrap` con `spacing: 12` y tres `MoodButton`: `Chill`, `Fiesta` y
   `Enfoque`. Solo uno puede estar seleccionado a la vez: guarde cuál en un campo del
   `State` y actualícelo con `setState`.
4. Un `PrimaryButton` `Continuar` que agregue el artista y el mood a
   `widget.profile` con `copyWith`, y entregue el resultado a `widget.onContinue`.

> Un `Row` también funciona para los moods, pero en pantallas angostas los tres
> botones no caben en una línea y se desborda. Por eso `Wrap`.

**Aviso importante.** Al tocar un botón de mood va a ver que **se borra el artista
que acababa de escribir**. No es culpa suya y **no lo arregle todavía**. Anote en qué
momento exacto pasa. Lo resolvemos en la Parte 8.

# Parte 3: el paso 3 del onboarding

Archivo: `lib/pages/step3_page.dart`

Es una `Page` y su raíz es un `SingleChildScrollView`, porque el contenido no cabe en
un celular.

![Imagen](lab2Step3.png "frame60")

1. Un `StepHeader` con `step: 3`, título `Tu primera playlist` y subtítulo
   `Dale un nombre y una portada`.
2. Un `LabeledTextField` `Nombre de la playlist` (hint `Chill Vibes Songs`).
3. Un `LabeledTextField` `URL de la portada` (hint `https://picsum.photos/300`,
   `icon: Icons.link`).
4. Un `SecondaryButton` `Previsualizar` que muestre esa imagen en un `PlaylistCover`
   de `size: 180`, centrado. Para que la portada cambie tiene que guardar la URL en un
   campo del `State` y llamar `setState`.
5. Un `PrimaryButton` `Continuar` que agregue el nombre y la portada con `copyWith`,
   y entregue el resultado a `widget.onContinue`.

Si la URL no carga, `PlaylistCover` ya muestra un icono de nota musical en vez de
reventar: usted no tiene que manejar ese error.

# Parte 4: el resumen

Archivo: `lib/pages/summary_page.dart`

Puede ser un `StatelessWidget`: no tiene nada que recordar.

![Imagen](lab2Summary.png "frame60")

1. Un círculo verde de 64 con un check negro, el título `Así te vamos a conocer` y el
   subtítulo `Puedes cambiar esto después en tu perfil`.
2. Seis `InfoRow`, uno por campo del perfil: Correo, Nombre, Usuario, Artista
   favorito, Mood y Playlist.
3. Un `PrimaryButton` `Empezar a escuchar` cuyo `onPressed` sea `onStart`.

**Esta Page no navega.** Mire quién lo hace: el método `_start` de
`onboarding_screen.dart`. El onboarding terminó y el usuario no debe poder
devolverse, así que se borra todo el historial:

```dart
Navigator.pushNamedAndRemoveUntil(
  context,
  '/main',
  (route) => false,
  arguments: profile,
);
```

Cómo comprueba que quedó bien: al llegar a la pantalla principal **no** debe haber
flecha de retroceso, porque ya no hay nada debajo en la pila.

# Parte 5: la pantalla principal

Archivo: `lib/screens/main_screen.dart` — use como molde `onboarding_screen.dart`,
que hace exactamente lo mismo con sus cuatro Pages.

![Imagen](lab2Home.png "frame60")

1. Un `StatefulWidget` con `int _currentIndex = 0`.
2. Reciba el `MusicProfile` con
   `ModalRoute.of(context)!.settings.arguments as MusicProfile`.
3. En el `body`, muestre la Page del índice: 0 → `HomePage`, 1 → `PlaylistPage`,
   2 → `ProfilePage`. A las tres les pasa el perfil por el constructor.
4. Un `AppTopBar` en el `appBar` del `Scaffold`, con el título del tab activo:
   `Inicio`, `Tu playlist` o `Perfil`.
5. Un `BottomNavigationBar` con **exactamente 3 items**: `Inicio` (`Icons.home`),
   `Playlist` (`Icons.music_note`) y `Perfil` (`Icons.person`), con
   `currentIndex: _currentIndex` y un `onTap` que llame `setState`.

Use `type: BottomNavigationBarType.fixed`, si no Flutter esconde las etiquetas de los
items inactivos.

Note que el título es de la Screen, no de las Pages: por eso la barra superior se
queda quieta mientras el `body` cambia.

# Parte 6: las otras dos Pages

Archivos: `lib/pages/playlist_page.dart` y `lib/pages/profile_page.dart`.
Molde: `home_page.dart`. Las dos son Pages: **sin `Scaffold`**.

### `PlaylistPage`

![Imagen](lab2Playlist.png "frame60")

1. Un `PlaylistHero` con `profile.playlistName`, `profile.mood` y `profile.coverUrl`.
   Ya dibuja la portada grande, el nombre y la línea `Playlist · mood`.
2. Dos `InfoRow`: `Creada por` → `'@${profile.username}'` e `Inspirada en` →
   `profile.favoriteArtist`.

Sin título: el `AppTopBar` de la `MainScreen` ya muestra `Tu playlist`.

### `ProfilePage`

![Imagen](lab2Profile.png "frame60")

1. Un `ProfileHeader` con `profile.name` y `profile.username`.
2. Cuatro `InfoRow`: `Correo`, `Artista favorito`, `Mood` y `Playlist`.
3. Un `SecondaryButton` `Editar perfil` con `fullWidth: true`, cuyo `onPressed` sea
   `onEdit`.
4. Debajo, otro `SecondaryButton` `Cerrar sesión` con `fullWidth: true`, cuyo
   `onPressed` sea `onSignOut`.

Fíjese en que esta Page tampoco navega: recibe `onEdit` y `onSignOut` y los llama.
Quien navega es la `MainScreen`.

# Parte 7: devolver un dato

Archivo: `lib/screens/edit_profile_screen.dart`, más el `await` en `MainScreen`.

Es la única pantalla que **devuelve** un valor.

![Imagen](lab2EditProfile.png "frame60")

1. Reciba el `MusicProfile` actual con `ModalRoute`.
2. Dos `LabeledTextField`: `Nombre completo` y `Nombre de usuario`, usando los valores
   actuales como hint.
3. Un `PrimaryButton` `Guardar` que arme el perfil actualizado con `copyWith` y lo
   devuelva:

```dart
Navigator.pop(context, updatedProfile);
```

El segundo argumento de `pop` es el valor de retorno. Del otro lado, la `MainScreen`
lo espera con `await`. Para guardarlo necesita un campo que empieza en `null` y le
gana al argumento original cuando se llena:

```dart
MusicProfile? _editedProfile;

@override
Widget build(BuildContext context) {
  final original = ModalRoute.of(context)!.settings.arguments as MusicProfile;
  final profile = _editedProfile ?? original;
  ...
}

Future<void> _editProfile(MusicProfile profile) async {
  final result = await Navigator.pushNamed(
    context, '/edit-profile', arguments: profile,
  );
  if (!mounted) return;
  if (result != null) {
    setState(() => _editedProfile = result as MusicProfile);
  }
}
```

Dos trampas de ese método:

- **No** puede escribir `pushNamed<MusicProfile>(...)`. Las rutas de la tabla `routes`
  de `MaterialApp` producen un `MaterialPageRoute<dynamic>`, y ese tipo no se deja
  convertir. Se pide sin tipo y se le hace cast al resultado, igual que con
  `arguments`.
- Si el usuario se devuelve con la flecha en vez de guardar, llega `null`. Por eso se
  pregunta antes de tocar el estado.

La `MainScreen` también le pasa a la `ProfilePage` un `onSignOut`, que vuelve al login
borrando todo el historial — el mismo `pushNamedAndRemoveUntil` del resumen, pero en
sentido contrario:

```dart
void _signOut() {
  Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
}
```

# Parte 8: el arreglo

Archivo: `lib/components/labeled_text_field.dart`

En el Paso 3 el botón `Previsualizar` le mostró el mismo problema del Paso 2: el
campo de texto se borra.

Arregle el componente **una sola vez**, y con eso quedan bien todas las pantallas que
piden datos. La pista: mire **dónde** está creado el `TextEditingController` y **qué
tipo de widget** es `LabeledTextField` hoy.

Cuando lo arregle, agregue también el `dispose()` que libera el controller.

## Reflexión

Responda en máximo 10 líneas dentro del `README.md` de su entrega:

1. ¿Qué se vuelve a ejecutar cada vez que Flutter reconstruye un widget? ¿Dónde estaba
   creado el `TextEditingController`?
2. En el Login y en el Paso 1 el campo nunca se borraba. ¿Por qué sí se borraba en el
   Paso 2?
3. ¿Por qué un componente que maneja input **tiene que ser** un `StatefulWidget`?
   ¿Qué pasa si nunca llama a `dispose()`?

## Restricciones

- **Sin listas.** Nada de `ListView` ni recorridos sobre colecciones. Todo lo que hay
  que mostrar cabe en widgets escritos uno por uno.
- **Sin paquetes de gestión de estado.** Solo `setState`.
- **Sin `go_router`.** Rutas nombradas y `Navigator`, a propósito, para que se vea la
  pila de navegación.
- Los datos viven en memoria. No hay backend ni persistencia.

## Autoevaluación

El proyecto trae un test que recorre el flujo completo:

```plain
flutter test
```

Al empezar **falla**, y eso está bien: va llegando cada vez más lejos a medida que
usted avanza. Úselo como semáforo. Cuando pase, terminó el laboratorio.
