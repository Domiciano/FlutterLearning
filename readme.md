<img width="256" src="https://www.icesi.edu.co/launiversidad/images/La_universidad/logo_icesi.png">

# Flutter

### Crear un proyecto de flutter
```
flutter create --org icesi.edu.co miapp
```

Los nombres de las apps no pueden contener mayúsculas

Ejecutar en iOS



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

### Ejecutar una app

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
sdk gphone64 arm64 (mobile) • emulator-5554     • android-arm64     • Android 13 (API 33) (emulator)
iPhone 14 Pro Max (mobile)  • 833FEF07-C34F-4BE9-944C-DE01BF091C7C  • ios   • com.apple.CoreSimulator.SimRuntime.iOS-16-4 (simulator)
macOS (desktop)             • macos             • darwin-arm64      • macOS 13.2 22D49 darwin-arm64
```
En este output el segundo parámetro es el ID del dispositivo. Entonces puede usar por ejemplo
```
flutter run -d emulator-5554
```
o en iOS
```
flutter run -d 833FEF07-C34F-4BE9-944C-DE01BF091C7C
```
