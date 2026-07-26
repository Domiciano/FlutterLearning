import { describe, it, expect } from 'vitest';
import { extractLessonTags, topicsFor } from './lessonTags';

describe('extractLessonTags', () => {
  it('lee las etiquetas del comentario HTML', () => {
    const md = '# Spring IoC\n<!-- tags: IoC Container, inyección de dependencias, @Autowired -->\n\nTexto.';
    expect(extractLessonTags(md)).toEqual(['IoC Container', 'inyección de dependencias', '@Autowired']);
  });

  it('acepta la forma singular y espaciados raros', () => {
    expect(extractLessonTags('<!--tag:  streams ,  async*  -->')).toEqual(['streams', 'async*']);
  });

  it('una lección sin etiquetas no da error, da lista vacía', () => {
    expect(extractLessonTags('# Sin etiquetas\n\nTexto.')).toEqual([]);
    expect(extractLessonTags(undefined)).toEqual([]);
  });

  it('descarta repetidas sin importar mayúsculas', () => {
    expect(extractLessonTags('<!-- tags: Beans, beans, BEANS -->')).toEqual(['Beans']);
  });

  it('descarta las demasiado largas, que desbordarían el chip', () => {
    const larga = 'una etiqueta muchísimo más larga de lo que cabe en un atajo de la interfaz';
    expect(extractLessonTags(`<!-- tags: corta, ${larga} -->`)).toEqual(['corta']);
  });

  it('corta en seis: más atajos que eso dejan de ser atajos', () => {
    expect(extractLessonTags('<!-- tags: a,b,c,d,e,f,g,h -->')).toHaveLength(6);
  });
});

describe('topicsFor', () => {
  it('prefiere las etiquetas declaradas', () => {
    const md = '<!-- tags: beans -->\n## Apartado uno\n## Apartado dos';
    const subtitles = [{ text: 'Apartado uno' }, { text: 'Apartado dos' }];
    expect(topicsFor({ markdown: md, subtitles })).toEqual(['beans']);
  });

  it('sin etiquetas usa los títulos de los apartados, para que funcione sin anotar nada', () => {
    // Las 148 lecciones de los dos cursos no tienen etiquetas todavía: si esto
    // no funcionara, los atajos estarían vacíos en todas.
    const subtitles = [{ text: 'Instalación del IoC Container' }, { text: 'Beans' }];
    expect(topicsFor({ markdown: '# Sin tags', subtitles })).toEqual([
      'Instalación del IoC Container', 'Beans',
    ]);
  });

  it('sin nada de nada devuelve lista vacía, no revienta', () => {
    expect(topicsFor({})).toEqual([]);
  });
});
