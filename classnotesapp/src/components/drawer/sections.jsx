import LessonParser from "@/components/lesson/LessonParser";
import lesson1 from "@/content/lesson1.md?raw";

const createLesson = (id, label, rawContent) => ({
  type: "lesson",
  id: String(id),
  label,
  component: <LessonParser content={rawContent} />,
});

export const sections = [
  { type: "title", id: "instalacion", label: "Instalación" },
  createLesson(1, "Instalación de Flutter", lesson1),
  createLesson(2, "Crear aplicaciones", lesson1),
  createLesson(3, "Ejecutar la app", lesson1),
  createLesson(4, "Configuración de dispositivos virtuales", lesson1),

  { type: "divider" },

  { type: "title", id: "dart", label: "Dart Basics" },
  createLesson(5, "Primitivos", lesson1),
  createLesson(6, "Operadores", lesson1),
  createLesson(7, "Control de flujo", lesson1),
  createLesson(8, "Métodos", lesson1),
  createLesson(9, "Lambdas", lesson1),
  createLesson(10, "Herencia, polimorfismo", lesson1),

  { type: "divider" },

  { type: "title", id: "widgets", label: "Widgets" },
  createLesson(11, "Estructura de la app", lesson1),
  createLesson(12, "Scaffold", lesson1),
  createLesson(13, "Árbol de widgets", lesson1),
  createLesson(14, "Container, Row y Column", lesson1),
  createLesson(15, "Diagramación acorde a la guía", lesson1),
  createLesson(16, "Agregación de imágenes: assets y network", lesson1),

  { type: "divider" },

  { type: "title", id: "diagramacion", label: "Diagramación" },
  createLesson(17, "Pantalla de Login", lesson1),
  createLesson(18, "Márgenes y posicionamiento", lesson1),
  createLesson(19, "Expanded", lesson1),
  createLesson(20, "ScrollView y overflows", lesson1),
  createLesson(21, "Creación de widgets", lesson1),
  createLesson(22, "Acciones como parámetro", lesson1),
  createLesson(23, "Widget parametrizado", lesson1),
  createLesson(24, "Stateful widget", lesson1),
  createLesson(25, "Constantes de estilo", lesson1),
  createLesson(26, "Funciones para estilo", lesson1),
  createLesson(27, "Const para widgets inmutables", lesson1),

  { type: "divider" },

  { type: "title", id: "navegacion", label: "Navegación" },
  createLesson(28, "Navegación entre pantallas", lesson1),
  createLesson(29, "Bottom navigation bar", lesson1),
  createLesson(30, "Secciones condicionales", lesson1),
];


