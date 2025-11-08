[t] Configurando Firebase para Enviar Notificaciones Push

Para que un backend pueda enviar notificaciones a tu app, necesita una autorización segura. Esta guía explica cómo configurar una "Cuenta de Servicio" en Firebase para obtener las credenciales necesarias.

[st] Requisitos Previos
[list]
Tener un proyecto de Firebase creado.
Haber conectado tu app de Flutter a Firebase, como se explica en la lección K0.
[endlist]

[st] Habilitar la API de Cloud Messaging (v1)
Primero, asegúrate de que la API para enviar mensajes esté activa en tu proyecto.

1. Ve a tu proyecto en la [link](Consola de Firebase) https://console.firebase.google.com/.
2. Haz clic en el ícono de engranaje (⚙️) junto a "Project Overview" y selecciona Configuración del proyecto.
3. Ve a la pestaña Cloud Messaging.
4. Si la "Firebase Cloud Messaging API (V1)" está desactivada, actívala. Generalmente, Firebase proporciona un enlace directo para hacerlo.

[st] Crear una Cuenta de Servicio (Service Account)
Una cuenta de servicio actúa como un "usuario robot" que representa a tu backend.

1. En la Configuración del proyecto, ve a la pestaña Cuentas de servicio.
2. Haz clic en el botón Crear cuenta de servicio.
3. Asigna un nombre descriptivo, como `backend-server` o `notificaciones-admin`.
4. En el campo Rol, selecciona `Firebase` y luego `Administrador de Firebase` (o `Firebase Admin`). Este rol le da permisos amplios para gestionar tu proyecto.
5. Haz clic en Listo para crear la cuenta.

[st] Generar la Clave JSON
La clave es un archivo que tu backend usará para autenticarse de forma segura.

1. Después de crear la cuenta, serás devuelto a la lista de "Cuentas de servicio".
2. Busca la cuenta que acabas de crear, haz clic en los tres puntos (⋮) y selecciona Administrar claves.
3. Serás redirigido a la consola de Google Cloud. Haz clic en AGREGAR CLAVE y luego en Crear clave nueva.
4. Selecciona el tipo de clave JSON y haz clic en CREAR.

El navegador descargará automáticamente un archivo `.json`.

¡Atención! Este archivo contiene credenciales de administrador para tu proyecto de Firebase. Trátalo como una contraseña: guárdalo en un lugar seguro y nunca lo subas a un repositorio público.

[st] ¡Listo para Enviar Notificaciones!
Con este archivo JSON, tu backend ahora tiene la autorización para autenticarse con los servidores de Google y enviar notificaciones push a través de FCM a tu aplicación de Flutter.

