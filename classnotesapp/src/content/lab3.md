[t] Laboratorio 3: Manejo de listas
[st] Introducción
En este corto laboratorio nos enfocaremos en producir elementos de lista usando como base el laboratorio 2.
El objetivo es que utilice la navegación entre pantallas para tener una pantalla donde tenga la `ListView` y otra donde tenga el formulario para producir los elementos de lista.

[st] Pantalla con `ListView`

Cree un `StatefulWidget` para `PlayListPage` que permita almacenar una lista de `playlist`.
[icon] lab3Image1.png
Por medio del botón `Crear`, la aplicación debe navegar hasta la siguiente pantalla que consiste en un formulario
[icon] lab3Image2.png
Es un formulario común, pero note que en el campo de imagen, puede poner una URL de una imagen de la web. Al pulsar ese botón puede previsualizar la imagen que es la que se muestra en el top.
Cuando le de al botón de `Crear playlist`, esto lleva nuevamente a la primera pantalla con la nueva playlist

Para representar cada Playlist debe crear el modelo de `Playlist`, el estado con el arreglo de `Playlist` y un `StatelessWidget` con la información de la playlist creada.
[icon] lab2image3.png

