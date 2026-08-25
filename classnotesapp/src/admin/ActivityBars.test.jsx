import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ActivityBars from './ActivityBars';
import { etiquetaCorta, diaSemana } from './activityCalendar';
import { ThemeProvider } from '@/theme/ThemeContext';

const dias = [
  { day: '2026-07-27', minutos: 60, activo: true },
  { day: '2026-07-28', minutos: 0, activo: false },
  { day: '2026-07-29', minutos: 25, activo: true },
];

const mount = (props = {}) =>
  render(
    <ThemeProvider>
      <ActivityBars dias={dias} hoy="2026-07-29" {...props} />
    </ThemeProvider>
  );

describe('etiquetas de fecha', () => {
  it('formatea sin pasar por new Date, que reinterpretaría el huso', () => {
    expect(etiquetaCorta('2026-07-29')).toBe('29 jul');
    expect(etiquetaCorta('2026-01-05')).toBe('5 ene');
  });

  it('saca el día de la semana en UTC', () => {
    expect(diaSemana('2026-07-27')).toBe('lun');
    expect(diaSemana('2026-08-02')).toBe('dom');
  });
});

describe('ActivityBars', () => {
  it('dibuja una barra por día, incluidos los de cero', () => {
    const { container } = mount();
    // Un rect de fondo + una barra por día.
    expect(container.querySelectorAll('rect')).toHaveLength(dias.length + 1);
  });

  it('el día sin actividad tiene altura, no desaparece', () => {
    const { container } = mount();
    const alturas = [...container.querySelectorAll('rect')].slice(1).map((r) => Number(r.getAttribute('height')));
    expect(alturas.every((h) => h > 0)).toBe(true);
  });

  it('expone una tabla accesible con una fila por día', () => {
    mount();
    const tabla = screen.getByRole('table');
    expect(within(tabla).getAllByRole('row')).toHaveLength(dias.length);
    expect(within(tabla).getByText('60 minutos')).toBeTruthy();
  });

  it('el svg queda fuera del árbol accesible: la tabla es el único camino', () => {
    const { container } = mount();
    expect(container.querySelector('svg').getAttribute('aria-hidden')).toBe('true');
  });

  it('sin ningún minuto no produce NaN en ningún atributo', () => {
    const vacios = dias.map((d) => ({ ...d, minutos: 0, activo: false }));
    const { container } = mount({ dias: vacios });
    const attrs = [...container.querySelectorAll('rect')].flatMap((r) => [
      r.getAttribute('height'),
      r.getAttribute('y'),
    ]);
    expect(attrs.some((a) => String(a).includes('NaN'))).toBe(false);
    expect(screen.getByText(/sin minutos registrados/i)).toBeTruthy();
  });

  it('anuncia su propio máximo, porque cada ventana tiene su escala', () => {
    mount();
    expect(screen.getByText(/máx\. 60 min/)).toBeTruthy();
  });

  it('sin días no pinta nada', () => {
    const { container } = mount({ dias: [] });
    expect(container.querySelector('svg')).toBeNull();
  });
});
