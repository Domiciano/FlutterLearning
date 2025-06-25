import Lesson1 from "../lessons/Lesson1";
import Lesson2 from "../lessons/Lesson2";

const sections = [
  { type: 'title', id: 'instalacion', label: 'Instalación' },
  { type: 'lesson', id: '1', label: 'Instalación de Flutter', component: <Lesson1 /> },
  { type: 'lesson', id: '2', label: 'Crear aplicaciones', component: <Lesson2 /> },
  { type: 'lesson', id: '3', label: 'Ejecutar la app', component: <Lesson1 /> },
  { type: 'lesson', id: '4', label: 'Configuración de dispositivos virtuales', component: <Lesson1 /> },

  { type: 'divider' },

  { type: 'title', id: 'dart', label: 'Dart Basics' },
  { type: 'lesson', id: '5', label: 'Primitivos', component: <Lesson1 /> },
  { type: 'lesson', id: '6', label: 'Operadores', component: <Lesson1 /> },
  { type: 'lesson', id: '7', label: 'Control de flujo', component: <Lesson1 /> },
  { type: 'lesson', id: '8', label: 'Metodos', component: <Lesson1 /> },
  { type: 'lesson', id: '9', label: 'Lambdas', component: <Lesson1 /> },
  { type: 'lesson', id: '10', label: 'Herencia, polimorfismo', component: <Lesson1 /> },

  { type: 'divider' },

  { type: 'title', id: 'widgets', label: 'Widgets' },
  { type: 'lesson', id: '11', label: 'Estructura de la app', component: <Lesson1 /> },
  { type: 'lesson', id: '12', label: 'Scaffold', component: <Lesson1 /> },
  { type: 'lesson', id: '13', label: 'Árbol de widgets', component: <Lesson1 /> },
  { type: 'lesson', id: '14', label: 'Container, Row y Column', component: <Lesson1 /> },
  { type: 'lesson', id: '15', label: 'Diagramación acorde a la guía', component: <Lesson1 /> },
  { type: 'lesson', id: '16', label: 'Agregación de imágenes: assets y network', component: <Lesson1 /> },

  { type: 'divider' },

  { type: 'title', id: 'diagramacion', label: 'Diagramación' },
  { type: 'lesson', id: '17', label: 'Pantalla de Login', component: <Lesson1 /> },
  { type: 'lesson', id: '18', label: 'Márgenes y posicionamiento', component: <Lesson1 /> },
  { type: 'lesson', id: '19', label: 'Expanded', component: <Lesson1 /> },
  { type: 'lesson', id: '20', label: 'ScrollView y overflows', component: <Lesson1 /> },
  { type: 'lesson', id: '21', label: 'Creación de widgets', component: <Lesson1 /> },
  { type: 'lesson', id: '22', label: 'Acciones como parámetro', component: <Lesson1 /> },
  { type: 'lesson', id: '23', label: 'Widget parametrizado', component: <Lesson1 /> },
  { type: 'lesson', id: '24', label: 'Stateful widget', component: <Lesson1 /> },
  { type: 'lesson', id: '25', label: 'Constantes de estilo', component: <Lesson1 /> },
  { type: 'lesson', id: '26', label: 'Funciones para estilo', component: <Lesson1 /> },
  { type: 'lesson', id: '27', label: 'Const para widgets inmutables', component: <Lesson1 /> },

  { type: 'divider' },

  { type: 'title', id: 'navegacion', label: 'Navegación' },
  { type: 'lesson', id: '28', label: 'Navegación entre pantallas', component: <Lesson1 /> },
  { type: 'lesson', id: '29', label: 'Bottom navigation bar', component: <Lesson1 /> },
  { type: 'lesson', id: '30', label: 'Secciones condicionales', component: <Lesson1 /> },
];

export default sections;
