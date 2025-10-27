[t] Laboratorio 8

En este laboratorio, integre las funcionalidades de selección de imágenes, subida a Supabase Storage y gestión de políticas para crear una característica común en muchas aplicaciones: la foto de perfil de usuario.

[st] Objetivo

Implementar una funcionalidad que permita a los usuarios:
1.  Seleccionar una imagen desde su galería o tomar una foto con la cámara.
2.  Subir esa imagen a Supabase Storage.
3.  Mostrar la imagen como su foto de perfil.
4.  Asegurar que cada usuario solo pueda gestionar su propia foto de perfil utilizando las políticas de Supabase Storage.

[st] Guía de Implementación

[st] 1. Preparación del Entorno
[list]
Asegúrate de que tu proyecto Flutter tenga las dependencias `image_picker` y `supabase_flutter` instaladas.
Verifica que Supabase esté inicializado correctamente en tu `main.dart`.
[endlist]

[st] 2. Interfaz de Usuario (UI)
[list]
Crea un widget donde el usuario pueda ver su foto de perfil actual (por ejemplo, un `CircleAvatar` o `Image`).
Añade un botón o un gesto que, al ser presionado, permita al usuario cambiar su foto de perfil.
[endlist]

[st] 3. Selección y Subida de la Imagen
[list]
Implementa la lógica para que, al interactuar con el botón/gesto, se abra el selector de imágenes (galería o cámara).
Una vez seleccionada la imagen, utiliza el cliente de Supabase para subirla a un bucket de Storage.
`Importante` Asegúrate de que el nombre del archivo o la ruta en el bucket sea única para cada usuario y esté asociada a su `auth.uid()`. Por ejemplo: `profiles/<user_id>/avatar.jpg`.
Considera guardar la URL o nombre de la foto de perfil en la tabla de `users` de tu base de datos de Supabase.
[endlist]

[st] 4. Mostrar la Foto de Perfil
[list]
Después de subir la imagen, obtén la URL (pública o firmada, según tu necesidad) del archivo subido.
Usa `Image.network()` para mostrar esta URL en tu `Image` o el widget de imagen que hayas elegido.
[endlist]

[st] 5. Configuración de Políticas de Seguridad
[list]
Dirígete al dashboard de Supabase y configura las políticas de Storage para tu bucket de perfiles.
Crea políticas que permitan a los usuarios autenticados:
    *   Leer (`SELECT`) su propia foto de perfil.
    *   Subir (`INSERT`) su propia foto de perfil.
    *   Actualizar (`UPDATE`) o Eliminar (`DELETE`) su propia foto de perfil.
Utiliza `auth.uid()` en tus políticas para asegurar que los usuarios solo puedan interactuar con sus propios archivos.
[endlist]

[st] Reto

Agregue fotos al chat hecho en el laboratorio anterior