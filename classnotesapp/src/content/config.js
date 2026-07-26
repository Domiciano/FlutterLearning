// src/content/config.js
// SPEC-10: Single build-time artifact that points the app at its content source.
//
// The app fetches content at runtime from the `second` remote
// (DomicianoRincon/FlutterApps) — that's the repo raw.githubusercontent serves,
// so content changes must be pushed there to go live. See CLAUDE.md "Git Remotes".

const courseConfig = {
  tocUrl: 'https://raw.githubusercontent.com/DomicianoRincon/FlutterApps/refs/heads/main/toc.md',

  // Calendario del curso. Es dato del profesor, no del alumno: constante en el repo,
  // sin UI. Lo consume el análisis, no la app — ver analitics/features.md § F4.4.
  //
  // courseStartDate: lunes de la SEMANA 1. De aquí sale la fecha planeada de cada
  // lección (`courseStartDate + (week − 1) × 7 días`, con `week` que el parser arrastra
  // desde los títulos [t] de toc.md, SPEC-13), y sin ella no existe `scheduleLagDays`
  // — H3, la hipótesis núcleo de la alerta temprana de RQ4.
  //
  // ⚠️ En este curso el toc.md solo nombra la semana en 19 de 80 lecciones (SEMANA 1,
  // 2 y 3); las demás secciones —BloC, Supabase, Database, Realtime, Storage, Maps,
  // Push, DI, Deploy— no la nombran, así que quedan con `week: null` y fuera de H3.
  // Para que H3 sea evaluable en Móviles hay que añadir la semana a esos títulos.
  courseStartDate: '2026-07-27',

  // Cortes evaluativos, en orden. Cada uno { id, label, date } con `date` en AAAA-MM-DD.
  // Definen las "48 h previas" de `crammingRatio` (H2) y son la clave para unir con
  // `gradeMidterm{n}` de datadict.md § 4.
  // PENDIENTE: fechas sin definir. Mientras esté vacío H2 no se puede evaluar, pero no
  // se pierden datos: se calcula después sobre la traza ya recogida.
  assessments: [],
};

export default courseConfig;
