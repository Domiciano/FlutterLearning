# Laboratorio 2: Icesi Beats
<!-- tags: Navigator.pushNamed, pushNamedAndRemoveUntil, Navigator.pop, ModalRoute,
     arguments, rutas nombradas, BottomNavigationBar, Screen vs Page, callback,
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

## Estructura del proyecto

```plain
lib/
├── main.dart              // MaterialApp + tabla de rutas
├── theme/app_theme.dart   // AppColors + buildTheme()
├── models/                // MusicProfile, lo diseña usted
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

  <text class="note" x="152" y="404" data-fit="900">la Screen guarda el perfil y cambia el índice — entre pasos NO hay Navigator</text>

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

Clone el repositorio base del laboratorio.

```plain
git clone https://github.com/Domiciano/Apps262Lab2
```

Al correrlo por primera vez va a ver una **galería de componentes**: una pantalla con
los 13 componentes que trae el proyecto, uno debajo del otro, funcionando. Recórrala
antes de empezar, para saber con qué cuenta. Deja de ser la pantalla inicial en cuanto
registre las rutas en la Parte 1.

# Parte 1: las rutas

Registre las cuatro rutas en el `MaterialApp` de la aplicación. Son solo cuatro porque
los tres pasos y el resumen son `Page`, no `Screen`: viven dentro de la
`OnboardingScreen`.

```plain
'/'             -> LoginScreen()
'/onboarding'   -> OnboardingScreen()
'/main'         -> MainScreen()
'/edit-profile' -> EditProfileScreen()
```

![Imagen](lab2Login.png "scale35")

- [ ] Reemplazar `home` por `initialRoute` y `routes` en el `MaterialApp`.
- [ ] Registrar las cuatro rutas de la aplicación.
- [ ] Comprobar que el botón `Entrar` del login lleva al Paso 1.

# Parte 2: el modelo, la Screen del onboarding y sus dos primeros pasos

Construya una clase `MusicProfile` que modele todo lo que se llena en los tres pasos
del onboarding. El correo llega del login.

Construya también la `OnboardingScreen`, que es la Screen que hostea las cuatro Pages:
guarda en qué paso va y el perfil que se está llenando, muestra la Page que corresponda
y le pasa a cada una lo que necesita. Las Pages le reportan de vuelta lo que el usuario
escribió, y al terminar el resumen es ella la que entra a la app.

Y construya los dos primeros pasos. El primero pide el nombre completo y el nombre de
usuario, con `StepHeader` y dos `LabeledTextField`.

![Imagen](lab2Step1.png "scale35")

El segundo pregunta por el artista favorito y el mood. El mood se elige entre tres
`MoodButton` y solo uno puede quedar activo a la vez, así que esa Page necesita estado.

![Imagen](lab2Step2.png "scale35")

- [ ] Construir la clase `MusicProfile` que modele los datos de los tres pasos.
- [ ] Armar la `OnboardingScreen` para que muestre un paso a la vez y guarde el perfil.
- [ ] Armar la `Step1Page` con los dos campos de nombre.
- [ ] Armar la `Step2Page` con el campo de artista y los tres botones de mood.
- [ ] Guardar el mood elegido en el `State` para que solo uno quede marcado.
- [ ] Hacer que lo que el usuario escriba en cada paso quede guardado en el perfil.

> Ponga los tres botones en un `Wrap`, no en un `Row`: en pantallas angostas no caben
> en una línea y se desbordan.

**Aviso importante.** Al tocar un botón de mood va a ver que **se borra el artista que
acababa de escribir**. No es culpa suya y **no lo arregle todavía**. Anote en qué
momento exacto pasa. Lo resolvemos en la Parte 8.

# Parte 3: el paso 3 del onboarding

Construya la `Step3Page`.

El tercer paso pide el nombre de la playlist y la URL de su portada. El botón
`Previsualizar` muestra esa imagen sin salir de la página, así que también necesita
estado. Use `StepHeader`, dos `LabeledTextField`, un `SecondaryButton` y un
`PlaylistCover`.

Como el contenido no cabe en un celular, la raíz de esta Page es un
`SingleChildScrollView`.

![Imagen](lab2Step3.png "scale35")

- [ ] Armar la página con los dos campos y el botón `Previsualizar`.
- [ ] Hacer que `Previsualizar` muestre en pantalla la imagen de la URL escrita.
- [ ] Hacer que el nombre y la portada queden guardados en el perfil.

> Si la URL no carga, `PlaylistCover` ya muestra un icono en vez de reventar: usted no
> tiene que manejar ese error.

# Parte 4: el resumen

Construya la `SummaryPage`.

La última página del onboarding le muestra al usuario todo lo que respondió, con un
`InfoRow` por dato, y lo deja entrar a la aplicación. No tiene nada que recordar, así
que puede ser un `StatelessWidget`.

![Imagen](lab2Summary.png "scale35")

- [ ] Mostrar los seis datos que el usuario respondió en los pasos anteriores.
- [ ] Llevar a la pantalla principal al pulsar `Empezar a escuchar`.
- [ ] Borrar el historial al entrar, de modo que allá **no** quede flecha de
      retroceso.

Esa última casilla es la importante. La Page no navega: quien lo hace es el método
`_start` de la `OnboardingScreen`. El onboarding terminó y el usuario no debe poder
devolverse, así que se borra todo el historial.

```dart
Navigator.pushNamedAndRemoveUntil(
  context,
  '/main',
  (route) => false,
  arguments: profile,
);
```

# Parte 5: la pantalla principal

Construya la `MainScreen`. Es el mismo patrón de la `OnboardingScreen` que ya hizo:
una Screen que guarda un índice y muestra la Page que corresponda.

La pantalla principal recibe el perfil, guarda cuál tab está activo y muestra la Page
que corresponda. Lleva un `AppTopBar` arriba y un `BottomNavigationBar` abajo.

![Imagen](lab2Home.png "scale35")

- [ ] Montar el `BottomNavigationBar` con tres items que cambien de Page al tocarlos.
- [ ] Dejar visibles las etiquetas de los tres items, incluso las de los inactivos.
- [ ] Poner el `AppTopBar` y hacer que su título cambie con el tab activo.
- [ ] Recibir el perfil y pasárselo a las tres Pages, de modo que el saludo muestre
      el nombre del usuario.

> Use `type: BottomNavigationBarType.fixed`, si no Flutter esconde las etiquetas de los
> items inactivos.

El título es de la Screen, no de las Pages: por eso la barra superior se queda quieta
mientras el `body` cambia.

# Parte 6: las tres Pages de los tabs

Construya la `HomePage`, la `PlaylistPage` y la `ProfilePage`. Las tres son Pages:
**sin `Scaffold`**.

La de inicio saluda al usuario por su nombre y muestra su playlist con una
`PlaylistCard` y un `HighlightCard`.

![Imagen](lab2Home.png "scale35")

La de playlist muestra la portada en grande con `PlaylistHero` y dos `InfoRow`. No
lleva título propio, porque el `AppTopBar` ya muestra `Tu playlist`.

![Imagen](lab2Playlist.png "scale35")

La de perfil muestra un `ProfileHeader`, cuatro `InfoRow` y dos `SecondaryButton`:
`Editar perfil` y `Cerrar sesión`.

![Imagen](lab2Profile.png "scale35")

- [ ] Armar la `HomePage` con el saludo y las dos tarjetas.
- [ ] Armar la `PlaylistPage` con la portada, el nombre y las dos filas de datos.
- [ ] Armar la `ProfilePage` con la cabecera, las cuatro filas y los dos botones.
- [ ] Dejar las tres sin `Scaffold`.

> Estas Pages no navegan: solo avisan que se pulsó cada botón. Quien navega es la
> `MainScreen`.

# Parte 7: devolver un dato

Construya la `EditProfileScreen`, y agregue el `await` en la `MainScreen`.

Es la única pantalla que **devuelve** un valor. Deja cambiar el nombre y el usuario, y
al guardar se cierra entregándole el perfil actualizado a quien la abrió.

![Imagen](lab2EditProfile.png "scale35")

- [ ] Abrir la pantalla de edición desde el botón `Editar perfil`.
- [ ] Devolver el perfil actualizado con `pop` y guardarlo, de modo que el nombre
      nuevo se vea en el tab de Perfil **y** en el de Inicio.
- [ ] Contemplar que el usuario se devuelva con la flecha en vez de guardar.
- [ ] Programar `Cerrar sesión` para volver al login borrando el historial.

Para guardar lo que vuelve, la `MainScreen` necesita un campo que empieza en `null` y
le gana al argumento original cuando se llena:

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
  producen un `MaterialPageRoute<dynamic>`, y ese tipo no se deja convertir. Se pide sin
  tipo y se le hace cast al resultado, igual que con `arguments`.
- Si el usuario se devuelve con la flecha, llega `null`. Por eso se pregunta antes de
  tocar el estado.

# Parte 8: el arreglo

El componente que hay que arreglar es `LabeledTextField`.

En el Paso 3 el botón `Previsualizar` le mostró el mismo problema del Paso 2: el campo
de texto se borra.

Arréglelo **una sola vez** y quedan bien todas las pantallas que piden datos. La pista:
mire **dónde** está creado el `TextEditingController` y **qué tipo de widget** es
`LabeledTextField` hoy.

- [ ] Convertir `LabeledTextField` en un `StatefulWidget`.
- [ ] Mover el `TextEditingController` al `State`, fuera de `build`.
- [ ] Agregar el `dispose()` que libera el controller.
- [ ] Comprobar que elegir un mood ya **no** borra el artista escrito.

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

