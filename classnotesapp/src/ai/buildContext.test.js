import { describe, it, expect } from 'vitest';
import {
  CONTEXT_MODE,
  MAX_FULL_LESSON_BYTES,
  composeMaterial,
  extractSubsection,
  buildSystemInstruction,
} from './buildContext';

const LESSON = [
  '# Streams en Dart',
  '',
  'Intro.',
  '',
  '## Crear un stream',
  '',
  'Texto de crear.',
  '',
  '### Detalle interno',
  '',
  'Un h3 NO corta el apartado.',
  '',
  '## Escuchar un stream',
  '',
  'Texto de escuchar.',
  '',
  '## Cerrar el stream',
  '',
  'Texto de cerrar.',
].join('\n');

describe('extractSubsection', () => {
  it('devuelve el apartado desde su ## hasta el siguiente', () => {
    const slice = extractSubsection(LESSON, 'Escuchar un stream');
    expect(slice).toContain('## Escuchar un stream');
    expect(slice).toContain('Texto de escuchar.');
    expect(slice).not.toContain('Texto de cerrar.');
  });

  it('un ### de dentro no corta el apartado', () => {
    const slice = extractSubsection(LESSON, 'Crear un stream');
    expect(slice).toContain('### Detalle interno');
    expect(slice).toContain('Un h3 NO corta el apartado.');
    expect(slice).not.toContain('Texto de escuchar.');
  });

  it('encuentra el apartado aunque el título venga con tildes o mayúsculas distintas', () => {
    const md = '## Navegación básica\n\ncontenido';
    expect(extractSubsection(md, 'NAVEGACION BASICA')).toContain('contenido');
  });

  it('devuelve null si el título no existe', () => {
    expect(extractSubsection(LESSON, 'No existe')).toBeNull();
  });
});

describe('composeMaterial', () => {
  it('sin contenido cargado no manda material y lo declara', () => {
    const out = composeMaterial({ rawContent: null, subtitles: [], subsectionTitle: null });
    expect(out.material).toBeNull();
    expect(out.contextMode).toBe(CONTEXT_MODE.NONE);
  });

  it('una lección normal viaja entera', () => {
    const out = composeMaterial({ rawContent: LESSON, subtitles: [], subsectionTitle: 'Crear un stream' });
    expect(out.material).toBe(LESSON);
    expect(out.contextMode).toBe(CONTEXT_MODE.FULL);
  });

  it('una lección enorme viaja como apartado activo más el índice del resto', () => {
    const relleno = 'x'.repeat(MAX_FULL_LESSON_BYTES);
    const enorme = `${LESSON}\n\n## Relleno\n\n${relleno}`;
    const subtitles = [
      { id: 's0', text: 'Crear un stream' },
      { id: 's1', text: 'Escuchar un stream' },
      { id: 's2', text: 'Cerrar el stream' },
    ];
    const out = composeMaterial({ rawContent: enorme, subtitles, subsectionTitle: 'Escuchar un stream' });

    expect(out.contextMode).toBe(CONTEXT_MODE.SUBSECTION);
    expect(out.material).toContain('Texto de escuchar.');
    expect(out.material).not.toContain(relleno);
    // El índice de los demás apartados sí va, para que el modelo sepa qué más hay.
    expect(out.material).toContain('Cerrar el stream');
    expect(out.material).toContain('(el que está leyendo)');
  });

  it('lección enorme sin apartado identificable manda el principio, pero no miente sobre el modo', () => {
    const enorme = `# Larga\n\n${'y'.repeat(MAX_FULL_LESSON_BYTES + 10)}`;
    const out = composeMaterial({ rawContent: enorme, subtitles: [], subsectionTitle: 'Inexistente' });
    expect(out.contextMode).toBe(CONTEXT_MODE.SUBSECTION);
    expect(out.material.length).toBeLessThanOrEqual(MAX_FULL_LESSON_BYTES);
  });
});

describe('buildSystemInstruction', () => {
  it('mete ubicación, temas y material, y prohíbe inventar', () => {
    const out = buildSystemInstruction({
      courseName: 'Computación en Internet II',
      courseHint: 'Java, Spring Boot',
      tocSection: 'SEMANA 3 · Spring Framework',
      lessonTitle: 'Inyección de dependencias',
      subsectionTitle: 'Beans',
      topics: ['IoC Container', '@Autowired'],
      material: '# Contenido',
    });
    expect(out).toContain('Computación en Internet II');
    expect(out).toContain('SEMANA 3 · Spring Framework');
    expect(out).toContain('Inyección de dependencias');
    expect(out).toContain('Beans');
    expect(out).toContain('Temas de esta lección: IoC Container, @Autowired.');
    expect(out).toContain('--- MATERIAL ---');
    expect(out).toContain('dilo en vez de inventarlo');
  });

  it('ordena responder directamente, sin devolver la pregunta', () => {
    // Es el fallo que se vio en producción: al estudiante le tocaba la plantilla
    // "dame una pista" y el asistente contestaba con otra pregunta.
    const out = buildSystemInstruction({ courseName: 'X', material: '# m' });
    expect(out).toContain('RESPONDE DIRECTAMENTE');
    expect(out).toContain('No devuelvas la pregunta');
  });

  it('sin material, se lo dice al modelo explícitamente', () => {
    const out = buildSystemInstruction({ courseName: 'X', material: null });
    expect(out).not.toContain('--- MATERIAL ---');
    expect(out).toContain('No tienes el texto de la lección delante');
  });
});
