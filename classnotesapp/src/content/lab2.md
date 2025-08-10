[t] Laboratorio 2: Componetizando Icesi Music

En este laboratorio, aprenderemos a construir una aplicación Flutter desde cero, enfocándonos en la `componetización`. La componetización es el proceso de dividir una interfaz de usuario compleja en piezas más pequeñas, reutilizables y manejables, llamadas componentes (o Widgets en Flutter).

El objetivo principal es que desarrolles la habilidad de pensar en términos de componentes, diseñándolos y construyéndolos de forma aislada antes de integrarlos en pantallas completas.

[st] Icesi Music: Una Visión General

Construiremos una aplicación de música simplificada llamada `Icesi Music`. Esta aplicación contará con dos pantallas principales:

`Pantalla de Perfil` Donde el usuario podrá ver su información y estadísticas.

`Pantalla de Playlists` Donde se mostrarán las listas de reproducción del usuario.

La navegación entre estas dos pantallas se realizará a través de una barra de navegación inferior (Bottom Navigation Bar), un componente común en muchas aplicaciones móviles.

[st] Enfoque del Laboratorio
Para este laboratorio, adoptaremos un enfoque `component first`. Esto significa que antes de empezar a construir las pantallas, nos centraremos en crear cada uno de los widgets individuales que necesitaremos.

[st] Manos a la obra
Vamos a analizar esta pantalla compuesta por dos `fragmentos` navegables por medio de la `BottomNavBar`.
[icon] lab2image1.png
De acuerdo a esto, desarrolle los siguientes componentes. En cada componente analíce cuáles son las entradas (propiedades)

[st] AppBar
Aqui puede usar la clase `AppBar` para definir el componente.
[icon] lab2image2.png
[st] MusicListItem
En este caso debe usar su conocimiento en `Row` y `Colum` para realizar el componente
[icon] lab2image3.png
[st] FloatingButton
Use la clase `FloatingActionButton`. Esta produce un boton circular. Si lo que quiere es un boton rectangular, para que quepa texto e icono, use el factory method `FloatingActionButton.extended`.
[icon] lab2image4.png
[st] Stat label
Que permita mostrar una estadística del perfil, con un label de entrada
[icon] lab2image5.png
[st] Profile View
Donde se puede ver la foto de perfil acompañada del nombre y correo electrónico
[icon] lab2image6.png
[st] Tabs
Con todas las piezas hechas, genere las dos tabs de la imagen: `ProfileTab` y `PlaylistTab`
[st] Navegación entre Tabs
Para esto requiere hacer una `Screen` que contenga a cada `Tab`. La Screen como lo hemos visto debe tener sí o sí un `Scaffold`.
Luego de esto, programe la navegación para que se pueda visualzar cada Tab.
[st] Navegación entre Screens
Ahora cree rápidamente esta screen a la que llamará `NewPlaylistScreen`
[icon] lab2image7.png
Haga que cuando el usuario le de al boton `Crear`, navegue hasta la nueva Screen
