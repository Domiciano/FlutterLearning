[t] Creando AAB Android
Para comenzar con el proceso de publicación, debe primero crear una `key`
[code:sh]
keytool -genkey -v -keystore ~/appkey.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
[endcode]
El comando pedirá:
[list]
Una contraseña (recuerda guardarla)
Nombre, organización, ciudad, país
Alias
Esto creará un archivo llamado appkey.jks en tu carpeta de usuario.
[endlist]
Al finalizar quedará el path de donde se alamcena el archivo `appkey.jks`.

Ahora, en el archivo `build.gradle.kts`, debe poner esto
[code:java]
import java.util.Properties
import java.io.FileInputStream

// Cargar las propiedades del keystore
val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
  signingConfigs {
        create("release") {
            keyAlias = keystoreProperties["keyAlias"] as String?
            keyPassword = keystoreProperties["keyPassword"] as String?
            storeFile = keystoreProperties["storeFile"]?.let { file(it) }
            storePassword = keystoreProperties["storePassword"] as String?
        }
  }

  buildTypes {
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
            isMinifyEnabled = false
            isShrinkResources = false
            // Usa true si configuras ProGuard
        }
  }

}
[endcode]

En la carpeta `android` cree un archivo `android/key.properties`, el contenido del archivo es
[code:properties]
storePassword=123456
keyPassword=123456
keyAlias=my-key-alias
storeFile=my-key.jks
[endcode]
Reemplazando los valores por los insertados con el `keytool`.

Finalmente escriba el comando
[code:sh]
flutter build appbundle --release
[endcode]
.