<img width="256" src="https://storage.googleapis.com/cms-storage-bucket/c823e53b3a1a7b0d36a9.png">

# Flutter



# Instalación
Siga la guía oficial de instalación de flutter https://docs.flutter.dev/install

Al terminar, confirme que en su terminal pueda usar el comando 

```bash
flutter doctor
```

Este comando le permite verificar qué le hace falta en la instalación.

Por ejemplo

```
[✓] Flutter (Channel stable, 3.32.2, on macOS 15.5 24F74 darwin-arm64, locale en-CO)
[!] Android toolchain - develop for Android devices (Android SDK version 35.0.1)
    ✗ cmdline-tools component is missing.
      Try installing or updating Android Studio.
      Alternatively, download the tools from https://developer.android.com/studio#command-line-tools-only and make sure to set the ANDROID_HOME
      environment variable.
      See https://developer.android.com/studio/command-line for more details.
    ✗ Android license status unknown.
      Run `flutter doctor --android-licenses` to accept the SDK licenses.
      See https://flutter.dev/to/macos-android-setup for more details.
[!] Xcode - develop for iOS and macOS (Xcode 16.4)
    ✗ CocoaPods not installed.
        CocoaPods is a package manager for iOS or macOS platform code.
        Without CocoaPods, plugins will not work on iOS or macOS.
        For more info, see https://flutter.dev/to/platform-plugins
      For installation instructions, see https://guides.cocoapods.org/using/getting-started.html#installation
[✓] Android Studio (version 2024.3)
[✓] IntelliJ IDEA Ultimate Edition (version 2025.1.1.1)
[✓] VS Code (version 1.100.2)
[✓] Connected device (2 available)
    ! Error: Browsing on the local area network for Domi iPhone. Ensure the device is unlocked and attached with a cable or associated with the same
      local area network as this Mac.
      The device must be opted into Developer Mode to connect wirelessly. (code -27)
[✓] Network resources
```

En este caso, hace falta seguir las instrucciones para obtener todos los checks necesarios. 

Necesita el Android SDK para aplicaciones de android y necesita XCode para aplicaciones de iOS

# Crear un proyecto de flutter
```
flutter create --org icesi.edu.co miapp
```
Los nombres de las apps no pueden contener mayúsculas

# Ejecutar el emulador

### Android
Para ejecutar un emulador de android desde la command line, use
```
emulator -list-avds
```
Para escanear los dispositivos primero necesita hacer que la carpeta platform-tools efectivamente esté en su variable de sistema PATH.

Luego ejecute alguno de sus dispositivos usando alguno de los nombres de la lista
```
emulator -avd Pixel_2_API_33
```
Dedique una sesión de consola para los logs del emulador

### iOS
Para abrir un emulador iOS use
```
open -a simulator
```

# Ejecutar la app

Puede escanear los dispositivos usando
```
flutter devices 
```

Puede usar 
```
flutter run
```

Pero si quiere ejecutar la app en un dispositivo específico use el output del comando flutter devices
```
sdk gphone64 arm64 (mobile) • emulator-5554                         • android-arm64     • Android 13 (API 33) (emulator)
iPhone 14 Pro Max (mobile)  • 833FEF07-C34F-4BE9-944C-DE01BF091C7C  • ios               • com.apple.CoreSimulator.SimRuntime.iOS-16-4 (simulator)
macOS (desktop)             • macos                                 • darwin-arm64      • macOS 13.2 22D49 darwin-arm64
```
En este output el segundo parámetro es el ID del dispositivo. Entonces puede usar por ejemplo para Android
```
flutter run -d emulator-5554
```
o en iOS
```
flutter run -d 833FEF07-C34F-4BE9-944C-DE01BF091C7C
```
