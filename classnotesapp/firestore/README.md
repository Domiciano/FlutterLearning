# Firestore — reglas e índices

Proyecto: **facelogprueba** (`courseId: moviles`).

Estos dos archivos son la única cosa del sensado que **no** se despliega con la app:
viven en el proyecto de Firebase, no en GitHub Pages. Mientras no se desplieguen, la
analítica no funciona — y lo que es peor, si el proyecto quedó en modo de prueba,
cualquier estudiante autenticado puede leer los datos de sus compañeros.

## Desplegar

```bash
npx firebase-tools login
npx firebase-tools use facelogprueba
npx firebase-tools deploy --only firestore:rules,firestore:indexes
```

Se ejecuta desde `classnotesapp/`, que es donde está `firebase.json`.

## Marcar al profesor

El acceso de lectura total se concede por *custom claim*, no por una lista de correos
dentro de las reglas: una lista en las reglas se vuelve historial público en el repo.
Se asigna una sola vez, desde un entorno con el Admin SDK (Cloud Shell sirve):

```js
const admin = require('firebase-admin');
admin.initializeApp();
admin.auth().getUserByEmail('TU_CORREO').then(u =>
  admin.auth().setCustomUserClaims(u.uid, { profesor: true })
);
```

El claim entra en el token al renovarlo: hay que cerrar sesión y volver a entrar.

Es la única llave de la **vista de administrador** (`/admin`, `src/admin/`): sin él,
Firestore rechaza tanto el barrido de `students` como la lista de clase de `rosters/`,
y la pantalla lo dice explícitamente en vez de fallar en silencio.

## La lista de clase vive en Firestore, no en el repo

`rosters/{courseId}-{semestre}` guarda la lista que entrega la universidad
(`students/262.md`: una línea por estudiante, `código nombre completo`). La sube el
profesor desde `/admin` con **Cargar lista (.md)**, y es lo único que el profesor
escribe en toda la base.

**Un documento por semestre** — `rosters/moviles-262` es la lista del 262. El
semestre sale del nombre del archivo que se carga, así que empezar un periodo nuevo no
pisa el anterior, y la vista deja cambiar de semestre con un selector. (`rosters/moviles`
a secas, sin sufijo, es el documento heredado de antes de esa separación; se sigue
leyendo como una lista "sin semestre".)

Está ahí, y no en el bundle ni en el repo de contenido, porque **el sitio es público**:
un `import` del `.md` lo serviría dentro del JS de GitHub Pages, y un `raw.github...`
lo dejaría abierto a cualquiera. En `rosters/` solo lo lee quien tiene el claim.

## Coste de leer la actividad de un estudiante

El panel de `/admin` lee la traza de una persona con dos consultas, y **las dos usan
índices que ya están en `firestore.indexes.json`**: `eventBatches` por `uid + serverTs` y
`prompts` por `uid + createdAt`. No hay que desplegar nada nuevo.

**No añadir `where('courseId','==',…)` a esas consultas.** Pediría un índice compuesto de
tres campos que no existe, y el fallo solo aparece con datos reales. Es un proyecto
Firebase por curso: `uid` ya identifica sin ambigüedad.

Se pide **una sola vez el semestre entero** y la ventana de 7 días se recorta en memoria.
Un lote se cierra a 20 eventos o a 30 s, así que salen ~4–6 documentos por visita a una
lección: del orden de **150–300 lecturas** por estudiante en la semana 2 y **1 200–2 000**
en la semana 16. Repasar toda la lista de clase al final del semestre rozaría las 50 000
lecturas diarias del plan gratuito, y por eso hay caché en memoria por `uid` (TTL 10 min,
se invalida con *Recargar*) y **nada de precarga**: la actividad solo se pide al pulsar.

El pie del panel muestra los documentos que costó de verdad. Si esa cifra crece mucho, la
salida es precalcular un resumen por estudiante en Firestore — pero eso exige Cloud
Functions, que es plan de pago, porque las reglas prohíben (con razón) que el cliente del
estudiante escriba fuera de `eventBatches`.

## Comprobar que quedó bien

En la consola de Firebase → Firestore → Rules → *Playground*:

| Simulación | Resultado esperado |
|---|---|
| `get` en `/students/{otroUid}` autenticado como estudiante | **Denegado** |
| `create` en `/eventBatches/x` con `uid` distinto al autenticado | **Denegado** |
| `update` en `/examAttempts/x` siendo el dueño | **Denegado** (solo creación) |
| `create` en `/eventBatches/x` con el propio `uid` y `count: 20` | Permitido |
| `get` en `/rosters/moviles-262` autenticado como estudiante | **Denegado** |

Si la primera sale permitida, el proyecto sigue en modo de prueba y el despliegue no
se aplicó.
