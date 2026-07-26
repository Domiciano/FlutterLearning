// src/utils/tableOfContentsParser.js
// SPEC-09: supports [lesson:url] for remote lesson files fetched at runtime.
// SPEC-10: called with text fetched from a remote URL (configured in config.js).
// SPEC-11: parser is now fully synchronous — no fetch calls. Content loaded on demand by LessonPage.
// SPEC-12: lesson ids are authored in toc.md as a third field:
//            [lesson:url] <url> | <label> | <id>
//          The id is the key every analytics record is stored against, so it has to
//          be stable. The old behaviour — a positional counter — made the id mean
//          "position in toc.md": inserting a lesson silently renumbered every one
//          below it, breaking deep links and re-pointing historical data at the
//          wrong lesson. Entries without an explicit id still fall back to the
//          counter so a half-migrated toc.md keeps working.
// SPEC-13: los títulos [t] que nombran una semana ("SEMANA 3 · Spring Framework",
//          "Navegación · SEMANA 2") le pasan ese número a las lecciones que van
//          debajo, como `week`. Es la única fuente de la fecha planeada de cada
//          lección, y sin fecha planeada no existe `scheduleLagDays` (H3), que es
//          la hipótesis núcleo de la alerta temprana. Las secciones sin semana
//          ("Curso", "Extras", "BloC") dejan `week: null`: no están programadas,
//          y fingir una fecha sería peor que no tenerla.

// Reconoce la semana en cualquier posición del título, porque los dos cursos la
// escriben distinto: "SEMANA 3 · Tema" en Compunet2, "Tema · SEMANA 2" en Móviles.
const WEEK_IN_TITLE = /SEMANA\s+(\d+)/i;

const TableOfContentsParser = (tocContent) => {
  const lines = tocContent.split('\n').map(line => line.trim()).filter(line => line !== '');
  const sections = [];
  let lessonCounter = 0;
  let currentWeek = null;
  const idOwner = new Map(); // id -> url, to catch collisions
  const urlIds = new Map();  // url -> id, to catch the same lesson under two ids

  for (const line of lines) {
    // Disabled entries (prefixed with **)
    if (line.startsWith('**')) continue;

    if (line.startsWith('[t]')) {
      const label = line.slice(3).trim();
      const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const weekMatch = label.match(WEEK_IN_TITLE);
      // Un título sin semana corta el arrastre: si no, "Extras" al final heredaría
      // la semana 16 y sus lecciones parecerían programadas para esa fecha.
      currentWeek = weekMatch ? Number(weekMatch[1]) : null;
      sections.push({ type: 'title', id, label, week: currentWeek });

    } else if (line.startsWith('[d]')) {
      sections.push({ type: 'divider' });

    } else if (line.startsWith('[lesson:url]')) {
      // [lesson:url] <url> | <label> | <id>   (label and id both optional)
      const [rawUrl, rawLabel, rawId] = line.slice(12).split('|').map(part => part.trim());
      const url = rawUrl;
      const filenameLabel = url.split('/').pop(); // e.g. "lesson7.md"
      lessonCounter += 1;

      let id = rawId || '';
      if (!id) {
        id = String(lessonCounter);
        console.warn(
          `[TableOfContentsParser] Lección sin id explícito, se usa el posicional "${id}": ${url}. ` +
          `Añade un tercer campo en toc.md — [lesson:url] <url> | <título> | <id>`
        );
      }

      // The same lesson listed twice (e.g. under "Curso" and under its week) must
      // reuse one id, or the analytics split one lesson into two content units.
      const previousId = urlIds.get(url);
      if (previousId && previousId !== id) {
        console.warn(
          `[TableOfContentsParser] La lección ${url} aparece con dos ids distintos ` +
          `("${previousId}" y "${id}"). Sus datos quedarán partidos en dos.`
        );
      }
      const owner = idOwner.get(id);
      if (owner && owner !== url) {
        console.warn(
          `[TableOfContentsParser] El id "${id}" está repetido en dos lecciones distintas ` +
          `(${owner} y ${url}). Solo la última será alcanzable por la ruta.`
        );
      }
      urlIds.set(url, id);
      idOwner.set(id, url);

      sections.push({
        type: 'lesson',
        source: 'remote',
        id,
        ordinal: lessonCounter, // legacy numeric id, kept to redirect old deep links
        label: rawLabel || filenameLabel,
        week: currentWeek, // SPEC-13: semana programada, o null si la sección no la nombra
        url,
        rawContent: null, // loaded on demand by LessonPage via LessonContentCache
      });

    } else if (line.startsWith('[lesson]')) {
      // Local lesson — URL-only mode, ignore
      console.warn(`[TableOfContentsParser] Entrada local ignorada en modo URL: ${line}`);
    }
  }

  return sections;
};

export default TableOfContentsParser;
