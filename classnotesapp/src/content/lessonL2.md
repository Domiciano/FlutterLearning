[t] Controlando la Cámara del Mapa

Saber mostrar un mapa es genial, pero es aún más útil poder controlar lo que se ve. En esta lección, aprenderás a mover la cámara del mapa programáticamente para centrarla en la ubicación actual del usuario.

[st] Obteniendo la Ubicación del Usuario
Para mover la cámara a la ubicación del usuario, primero necesitamos saber dónde está. Usaremos el paquete `geolocator` que agregamos anteriormente. Dentro de tu clase `_MapScreenState`, crea un nuevo método para manejar la lógica de permisos y obtención de la ubicación.

[code:dart]
import 'package:geolocator/geolocator.dart'; // Asegúrate de importar el paquete

// Dentro de la clase _MapScreenState
Future<LatLng> _getUserLocation() async {
  bool serviceEnabled;
  LocationPermission permission;

  // Verifica si los servicios de ubicación están habilitados.
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    return Future.error('Los servicios de ubicación están deshabilitados.');
  }

  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      return Future.error('Los permisos de ubicación fueron denegados.');
    }
  }
  
  if (permission == LocationPermission.deniedForever) {
    return Future.error('Los permisos de ubicación están permanentemente denegados.');
  } 

  // Cuando los permisos están concedidos, obtenemos la posición.
  final position = await Geolocator.getCurrentPosition();
  return LatLng(position.latitude, position.longitude);
}
[endcode]

[st] Moviendo la Cámara a la Ubicación del Usuario
Ahora, modifica el método `_onMapCreated` para que sea `async` y use la función que acabamos de crear.

[code:dart]
void _onMapCreated(GoogleMapController controller) async {
  mapController = controller;

  try {
    final userLocation = await _getUserLocation();

    setState(() {
      _markers.clear(); // Limpiamos marcadores anteriores (como el de Google HQ)
      _markers.add(
        Marker(
          markerId: const MarkerId('user_location'),
          position: userLocation,
          infoWindow: const InfoWindow(title: 'Tú estás aquí'),
        ),
      );
    });

    // Anima la cámara para centrarse en la ubicación del usuario
    mapController.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(target: userLocation, zoom: 16.0),
      ),
    );
  } catch (e) {
    // Manejo de errores si no se puede obtener la ubicación
    print(e); 
  }
}
[endcode]
Usamos `mapController.animateCamera` para mover la vista del mapa de forma suave a una nueva `CameraPosition`.

[st] Profundizando en CameraPosition
`CameraPosition` tiene varias propiedades para controlar la vista del mapa:
- `target`: El punto `LatLng` en el centro de la pantalla.
- `zoom`: El nivel de magnificación. Va desde `1` (vista del mundo) hasta `20` (vista de edificios individuales). Un valor entre 15 y 17 es bueno para ver a nivel de calles.
- `bearing`: La dirección a la que "apunta" la cámara, en grados en el sentido de las agujas del reloj desde el Norte (0 a 360). También se conoce como azimuth.
- `tilt`: La inclinación de la cámara en grados. `0` es una vista cenital (directamente desde arriba), y puede ir hasta unos `90` grados para una vista en perspectiva.

Por ejemplo, para una vista más dramática, podrías hacer esto:
[code:dart]
mapController.animateCamera(
  CameraUpdate.newCameraPosition(
    CameraPosition(
      target: userLocation,
      zoom: 17.0,
      bearing: 90.0, // Apuntando hacia el Este
      tilt: 45.0,    // Vista en ángulo de 45 grados
    ),
  ),
);
[endcode]

[st] Resultado
Al ejecutar la aplicación, te pedirá permisos de ubicación. Una vez que los concedas, el mapa se animará suavemente hasta centrarse en tu ubicación actual, mostrando un marcador que dice "Tú estás aquí".