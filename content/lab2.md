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

## El grafo de navegación

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 860" width="100%"
     role="img" aria-labelledby="navttl navdsc"
     font-family="ui-sans-serif, -apple-system, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif">
  <title id="navttl">Grafo de navegación de Icesi Beats</title>
  <desc id="navdsc">LoginScreen lleva a OnboardingScreen, que hostea Step1Page, Step2Page, Step3Page y SummaryPage. Desde el resumen se entra a MainScreen, que hostea HomePage, PlaylistPage y ProfilePage, y desde ahí se abre EditProfileScreen o se cierra sesión volviendo al login.</desc>

  <defs>
    <style>
      .scr-box  { fill:#EEF1FF; stroke:#A9B4F2; stroke-width:1.5; }
      .scr-cont { fill:#EEF1FF; fill-opacity:.55; stroke:#A9B4F2; stroke-width:1.5; stroke-dasharray:7 5; }
      .pg-box   { fill:#E3F6F3; stroke:#86D3CA; stroke-width:1.5; }
      .chip     { fill:#F7F8FC; stroke:#D9DEE8; stroke-width:1; }
      .t-scr    { fill:#3B49B8; font-size:14px; font-weight:700; }
      .t-pg     { fill:#0F8478; font-size:14px; font-weight:700; }
      .body     { fill:#454C61; font-size:11.5px; }
      .lbl      { fill:#454C61; font-size:11px; font-weight:600; }
      .note     { fill:#5B6377; font-size:11px; }
      .mono     { font-family:ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace; }
      .link     { fill:none; stroke:#8A93A6; stroke-width:1.75; marker-end:url(#ar); }
      .link2    { fill:none; stroke:#8A93A6; stroke-width:1.75; marker-end:url(#ar); marker-start:url(#ar); }
      .dash     { stroke-dasharray:6 5; }
    </style>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
            markerUnits="strokeWidth" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 L2.4,5 Z" fill="context-stroke"/>
    </marker>
  </defs>

  <!-- Leyenda -->
  <g>
    <rect class="chip" x="840" y="56" width="304" height="76" rx="10"/>
    <rect x="856" y="74" width="14" height="14" rx="3" fill="#EEF1FF" stroke="#A9B4F2" stroke-width="1.5"/>
    <text class="note" x="880" y="85" data-fit="248">Screen · tiene Scaffold</text>
    <rect x="856" y="102" width="14" height="14" rx="3" fill="#E3F6F3" stroke="#86D3CA" stroke-width="1.5"/>
    <text class="note" x="880" y="113" data-fit="248">Page · va dentro de una Screen</text>
  </g>

  <!-- LoginScreen -->
  <g>
    <rect class="scr-box" x="104" y="64" width="232" height="72" rx="12"/>
    <text class="t-scr mono" x="120" y="94" data-fit="200">LoginScreen</text>
    <text class="body" x="120" y="115" data-fit="200">pide correo y contraseña</text>
  </g>

  <!-- Login -> Onboarding -->
  <path class="link" d="M220,136 L220,208"/>
  <g>
    <rect class="chip" x="236" y="161" width="196" height="22" rx="6"/>
    <text class="lbl mono" x="246" y="176" data-fit="176">pushNamed('/onboarding')</text>
  </g>

  <!-- OnboardingScreen -->
  <rect class="scr-cont" x="104" y="216" width="1032" height="208" rx="16"/>
  <text class="t-scr mono" x="128" y="250" data-fit="400">OnboardingScreen</text>

  <g>
    <rect class="pg-box" x="152" y="272" width="204" height="104" rx="12"/>
    <text class="t-pg mono" x="168" y="302" data-fit="172">Step1Page</text>
    <text class="body" x="168" y="324" data-fit="172">nombre y usuario</text>
    <text class="note" x="168" y="344" data-fit="172">viene resuelta</text>
  </g>
  <path class="link" d="M364,324 L388,324"/>

  <g>
    <rect class="pg-box" x="396" y="272" width="204" height="104" rx="12"/>
    <text class="t-pg mono" x="412" y="302" data-fit="172">Step2Page</text>
    <text class="body" x="412" y="324" data-fit="172">artista y mood</text>
  </g>
  <path class="link" d="M608,324 L632,324"/>

  <g>
    <rect class="pg-box" x="640" y="272" width="204" height="104" rx="12"/>
    <text class="t-pg mono" x="656" y="302" data-fit="172">Step3Page</text>
    <text class="body" x="656" y="324" data-fit="172">playlist y portada</text>
  </g>
  <path class="link" d="M852,324 L876,324"/>

  <g>
    <rect class="pg-box" x="884" y="272" width="204" height="104" rx="12"/>
    <text class="t-pg mono" x="900" y="302" data-fit="172">SummaryPage</text>
    <text class="body" x="900" y="324" data-fit="172">resumen de todo</text>
  </g>

  <text class="note" x="152" y="404" data-fit="900">onContinue(profile) y setState cambian el índice — entre pasos NO hay Navigator</text>

  <!-- Summary -> MainScreen -->
  <path class="link" d="M986,376 L986,452 L452,452 L452,488"/>
  <g>
    <rect class="chip" x="556" y="441" width="326" height="22" rx="6"/>
    <text class="lbl mono" x="566" y="456" data-fit="306">pushNamedAndRemoveUntil('/main')</text>
  </g>

  <!-- MainScreen -->
  <rect class="scr-cont" x="104" y="496" width="696" height="208" rx="16"/>
  <text class="t-scr mono" x="128" y="530" data-fit="400">MainScreen</text>

  <g>
    <rect class="pg-box" x="130" y="552" width="188" height="104" rx="12"/>
    <text class="t-pg mono" x="146" y="582" data-fit="156">HomePage</text>
    <text class="body" x="146" y="604" data-fit="156">saludo y playlist</text>
    <text class="note" x="146" y="624" data-fit="156">viene resuelta</text>
  </g>
  <path class="link2" d="M326,604 L350,604"/>

  <g>
    <rect class="pg-box" x="358" y="552" width="188" height="104" rx="12"/>
    <text class="t-pg mono" x="374" y="582" data-fit="156">PlaylistPage</text>
    <text class="body" x="374" y="604" data-fit="156">portada y datos</text>
  </g>
  <path class="link2" d="M554,604 L578,604"/>

  <g>
    <rect class="pg-box" x="586" y="552" width="188" height="104" rx="12"/>
    <text class="t-pg mono" x="602" y="582" data-fit="156">ProfilePage</text>
    <text class="body" x="602" y="604" data-fit="156">perfil y botones</text>
  </g>

  <text class="note" x="130" y="684" data-fit="640">BottomNavigationBar cambia el índice — tampoco hay Navigator</text>

  <!-- MainScreen -> EditProfileScreen -->
  <path class="link" d="M808,604 L896,604"/>
  <g>
    <rect class="chip" x="807" y="565" width="90" height="22" rx="6"/>
    <text class="lbl mono" x="817" y="580" data-fit="70">pushNamed</text>
  </g>

  <g>
    <rect class="scr-box" x="904" y="552" width="232" height="104" rx="12"/>
    <text class="t-scr mono" x="920" y="582" data-fit="200">EditProfileScreen</text>
    <text class="body" x="920" y="604" data-fit="200">edita nombre y usuario</text>
    <text class="note" x="920" y="624" data-fit="200">es la única que devuelve</text>
  </g>

  <!-- pop de vuelta -->
  <path class="link dash" d="M1020,656 L1020,744 L700,744 L700,712"/>
  <g>
    <rect class="chip" x="768" y="733" width="184" height="22" rx="6"/>
    <text class="lbl mono" x="778" y="748" data-fit="164">pop(context, perfil)</text>
  </g>

  <!-- cerrar sesión -->
  <path class="link" d="M500,704 L500,800 L68,800 L68,100 L96,100"/>
  <g>
    <rect class="chip" x="146" y="789" width="294" height="22" rx="6"/>
    <text class="lbl" x="156" y="804" data-fit="274">cerrar sesión · pushNamedAndRemoveUntil('/')</text>
  </g>
</svg>
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

![Imagen](lab2Login.png "scale60")

# Parte 2: el paso 2 del onboarding

Archivo: `lib/pages/step2_page.dart` — use como molde `step1_page.dart`, que ya está
resuelto.

El patrón de todos los pasos es el mismo: **RECIBIR → COMPLETAR → REPORTAR**. Así se
ve el Paso 1, que ya viene resuelto:

![Imagen](lab2Step1.png "scale60")

Y esto es lo que usted tiene que construir:

![Imagen](lab2Step2.png "scale60")

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

![Imagen](lab2Step3.png "scale60")

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

![Imagen](lab2Summary.png "scale60")

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

![Imagen](lab2Home.png "scale60")

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

![Imagen](lab2Playlist.png "scale60")

1. Un `PlaylistHero` con `profile.playlistName`, `profile.mood` y `profile.coverUrl`.
   Ya dibuja la portada grande, el nombre y la línea `Playlist · mood`.
2. Dos `InfoRow`: `Creada por` → `'@${profile.username}'` e `Inspirada en` →
   `profile.favoriteArtist`.

Sin título: el `AppTopBar` de la `MainScreen` ya muestra `Tu playlist`.

### `ProfilePage`

![Imagen](lab2Profile.png "scale60")

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

![Imagen](lab2EditProfile.png "scale60")

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

## Checklist de entrega

Marque cada punto solo cuando lo haya visto funcionando en la app corriendo.

**Rutas y arranque**

- [ ] `main.dart` usa `initialRoute` y `routes`, y ya no declara `home`.
- [ ] Las 4 rutas están registradas: `/`, `/onboarding`, `/main`, `/edit-profile`.
- [ ] El botón `Entrar` del login lleva al Paso 1.

**Onboarding**

- [ ] `Step2Page` muestra el campo de artista y los tres `MoodButton`.
- [ ] Solo un mood queda seleccionado a la vez.
- [ ] `Step3Page` muestra los dos campos y el botón `Previsualizar`.
- [ ] `Previsualizar` cambia la portada que se ve en pantalla.
- [ ] Los tres pasos completan el perfil con `copyWith` y lo entregan por `onContinue`.
- [ ] `SummaryPage` muestra los seis datos que el usuario respondió.
- [ ] Al pulsar `Empezar a escuchar` se llega a la pantalla principal **sin flecha de retroceso**.

**Pantalla principal**

- [ ] `MainScreen` tiene un `AppTopBar` cuyo título cambia con el tab activo.
- [ ] El `BottomNavigationBar` tiene 3 items y cambia de Page al tocarlos.
- [ ] Las etiquetas de los tres items se ven siempre (`BottomNavigationBarType.fixed`).
- [ ] `PlaylistPage` muestra el `PlaylistHero` y las dos filas de datos.
- [ ] `ProfilePage` muestra la cabecera, las cuatro filas y los dos botones.

**Ida y vuelta**

- [ ] `Editar perfil` abre `EditProfileScreen`.
- [ ] Al guardar, el nombre nuevo se ve en el tab de Perfil **y** en el de Inicio.
- [ ] Si se devuelve con la flecha en vez de guardar, no se pierde ni se rompe nada.
- [ ] `Cerrar sesión` vuelve al login **sin flecha de retroceso**.

**El arreglo**

- [ ] `LabeledTextField` es un `StatefulWidget`.
- [ ] Su `TextEditingController` vive en el `State`, no dentro de `build`.
- [ ] Tiene `dispose()` liberando el controller.
- [ ] Elegir un mood ya **no** borra el artista escrito.

**Estructura**

- [ ] El proyecto tiene exactamente 4 `Scaffold`.
- [ ] No hay ningún `Scaffold` en `lib/pages/`.
- [ ] No se usó `ListView` ni ningún recorrido sobre colecciones.

**Entrega**

- [ ] El `README.md` tiene una captura de cada pantalla.
- [ ] El `README.md` tiene la reflexión respondida.
