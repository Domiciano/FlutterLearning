[t] Instalación de Supabase (Self-hosted)
En esta lección aprenderás a instalar Supabase en modo self-hosted usando Docker Compose. Esto te permitirá tener una instancia local de Supabase con base de datos, autenticación, almacenamiento y la interfaz web Studio.

[st] Pasos para la instalación

[code:shell]
# Clona el repositorio oficial de Supabase
git clone --depth 1 https://github.com/supabase/supabase

# Crea un directorio para tu proyecto Supabase
mkdir supabase-project

# Copia los archivos de Docker al nuevo proyecto
cp -rf supabase/docker/* supabase-project

# Copia las variables de entorno de ejemplo
cp supabase/docker/.env.example supabase-project/.env

# Entra al directorio de tu proyecto
cd supabase-project

# Descarga las imágenes más recientes
docker compose pull

# Inicia los servicios en segundo plano
docker compose up -d
[endcode]


¡Listo! Ahora tienes Supabase corriendo localmente en modo self-hosted.

[st] Acceso a la interfaz web (Studio)


Puedes ingresar a la interfaz web de Supabase en:

[link] http://localhost:8000 http://localhost:8000


Credenciales por defecto:
Usuario: 
`supabase`
Contraseña: 
`this_password_is_insecure_and_should_be_updated`


Nota: Por seguridad, cambia la contraseña en producción.

[st] Acceso a las APIs

Cada una de las APIs está disponible a través del mismo API gateway:
[list]
REST:     `http://<your-ip>:8000/rest/v1/` 
Auth:     `http://<your-domain>:8000/auth/v1/` 
Storage:  `http://<your-domain>:8000/storage/v1/`
Realtime: `http://<your-domain>:8000/realtime/v1/`
[endlist]


Reemplaza `<your-ip>` o `<your-domain>` por la dirección de tu máquina o servidor donde esté corriendo Supabase. 

