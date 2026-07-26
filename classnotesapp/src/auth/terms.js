// src/auth/terms.js
//
// Texto de los Términos y Condiciones de la plataforma. Es contenido, no
// componente: `TermsDocument.jsx` lo renderiza y `TermsScreen.jsx` lo usa como
// puerta de entrada obligatoria tras el inicio de sesión con Google.
//
// Archivo idéntico entre cursos a propósito (el nombre del curso sale de
// `loginBranding.courseName`), para que comparar los dos corpus sea concatenar
// dos exportaciones y no reconciliar dos textos distintos.
//
// TERMS_VERSION: subirla obliga a **todos** los estudiantes a volver a leer y
// aceptar en su siguiente ingreso (`AuthContext` compara la versión guardada en
// el perfil contra esta). Súbela cuando cambie qué se captura, quién lo ve o
// cuánto se conserva; no por corregir una tilde.

export const TERMS_VERSION = '2026-07-26';

// Correo al que el estudiante escribe para preguntar, pedir su copia o retirar
// su consentimiento. Cámbialo por el institucional si prefieres ese canal.
export const TERMS_CONTACT = 'domic.rincon@gmail.com';

// Cada sección: { id, title, paragraphs?, bullets? }. `paragraphs` acepta
// strings; el renderizador pone en negrita lo que vaya entre **dobles
// asteriscos** (ver TermsDocument.jsx).
export const termsSections = [
  {
    id: 'que-es',
    title: '1. Qué es esta plataforma',
    paragraphs: [
      'Es el visor de notas de clase del curso, desarrollado y mantenido por el profesor del curso en la Universidad Icesi. Contiene el material de estudio de la asignatura y es de uso exclusivo de las personas inscritas o autorizadas.',
      'La plataforma es **también un instrumento de investigación educativa**: el curso estudia cómo los estudiantes usan el material para aprender, con el fin de mejorar su diseño. Por eso el acceso está condicionado a aceptar estos términos.',
    ],
  },
  {
    id: 'cuenta',
    title: '2. Tu cuenta y los datos que aportas',
    paragraphs: [
      'El ingreso se hace con tu cuenta de Google. De ella se recibe únicamente tu **nombre, tu correo y tu foto de perfil**. La plataforma nunca ve tu contraseña ni tiene acceso a tu correo, tus archivos ni ningún otro servicio de Google.',
      'Si te identificas como estudiante, además se te piden **tu código y tu usuario de GitHub**, para poder relacionar el material con tus entregas del curso.',
    ],
  },
  {
    id: 'investigacion',
    title: '3. Participación en la investigación',
    paragraphs: [
      'Mientras usas la plataforma se registra de forma automática **cómo interactúas con el material**. En concreto:',
    ],
    bullets: [
      'Qué lecciones abres, en qué orden y cuántas veces vuelves a ellas.',
      'Cuánto tiempo **activo** pasas en cada lección y en cada apartado (el tiempo con la pestaña de fondo o sin actividad no cuenta como estudio).',
      'Hasta dónde bajas en cada lección y si llegas al final.',
      'Con qué interactúas: copiar un bloque de código, abrir un editor incrustado, marcar una lección como estudiada, cambiar el tema claro/oscuro.',
      'Datos de contexto de cada sesión: fecha y hora, si entras desde móvil o escritorio, y el ancho de la ventana.',
    ],
    paragraphsAfter: [
      'Cuando el curso habilite los módulos de **autoexamen** y de **asistente de IA**, se registrarán también tus intentos y respuestas de examen, y el texto de las preguntas que le hagas al asistente junto con lo que el modelo responda. Conectar tu propia clave de API para el asistente de IA seguirá siendo **voluntario y separado**: no aceptas eso al aceptar estos términos.',
      'La participación en la investigación **no es separable del uso de la plataforma**: si no aceptas, no puedes acceder al material desde aquí. El profesor te dará una vía alterna para obtener el contenido del curso sin que se registre nada.',
    ],
  },
  {
    id: 'no-hacemos',
    title: '4. Lo que NO se hace con estos datos',
    bullets: [
      '**No afectan tu nota.** Ni el registro, ni su ausencia, ni lo que muestren, se usan para calificarte.',
      '**No se usan para decisiones individuales** sobre ti durante el semestre.',
      '**No se venden ni se comparten** con terceros, ni con fines comerciales ni publicitarios.',
      '**No se registra tu actividad fuera de esta plataforma**, ni lo que escribes en otras páginas o aplicaciones.',
      'La plataforma **no lee ni almacena contraseñas**.',
    ],
  },
  {
    id: 'quien-ve',
    title: '5. Dónde se guardan y quién los ve',
    paragraphs: [
      'Los datos se almacenan en Firebase (Google Cloud), en un proyecto propio del curso. El acceso al conjunto completo lo tiene únicamente **el profesor del curso**. Tú puedes consultar tus propios datos en cualquier momento pidiéndolos al correo del final.',
      'Ningún estudiante puede ver la actividad de otro.',
      'Para los análisis y para cualquier publicación derivada, los datos se reportan **agregados o seudonimizados**: la tabla que une tu identidad con tu código se mantiene separada del conjunto de análisis, y no se publican resultados que permitan identificarte.',
    ],
  },
  {
    id: 'retencion',
    title: '6. Retención y borrado',
    paragraphs: [
      'Los registros de uso se conservan mientras dure el estudio y hasta **cinco (5) años** después de terminado el semestre, plazo tras el cual se eliminan o quedan irreversiblemente anonimizados.',
      'Puedes pedir en cualquier momento que se borren tus datos escribiendo al correo del final. El borrado se hace efectivo sobre todo lo registrado hasta ese momento.',
    ],
  },
  {
    id: 'retirar',
    title: '7. Cómo retirar tu consentimiento',
    paragraphs: [
      'Puedes retirarlo cuando quieras, desde el menú de tu cuenta en la aplicación (opción **Términos y condiciones → Retirar mi consentimiento**) o escribiendo al correo del final.',
      'Como el acceso a la plataforma está condicionado a la aceptación, retirar el consentimiento **cierra tu sesión y te deja sin acceso al visor**. No tiene ninguna otra consecuencia: **no afecta tu nota, tu matrícula ni tu situación en el curso**, y el profesor te dará el material por otra vía.',
    ],
  },
  {
    id: 'cambios',
    title: '8. Cambios en estos términos',
    paragraphs: [
      'Si cambia qué se captura, quién lo ve o cuánto se conserva, se publica una versión nueva de este documento y se te pide aceptarla de nuevo antes de seguir usando la plataforma. Los cambios no se aplican de forma retroactiva sin tu aceptación.',
    ],
  },
  {
    id: 'contacto',
    title: '9. Contacto',
    paragraphs: [
      `Para preguntas, para pedir una copia de tus datos, para corregirlos o para pedir su borrado, escribe a **${TERMS_CONTACT}**.`,
      'Si tienes dudas sobre el manejo ético del estudio, puedes dirigirlas también al Departamento de Computación y Sistemas Inteligentes de la Universidad Icesi.',
    ],
  },
];
