import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const track = vi.fn();
vi.mock('@/analytics/AnalyticsProvider', () => ({ useAnalytics: () => ({ track }) }));

const { default: AiMarkdown } = await import('./AiMarkdown');
const { ThemeProvider } = await import('@/theme/ThemeContext');

const mount = (md) => render(<ThemeProvider><AiMarkdown>{md}</AiMarkdown></ThemeProvider>);

describe('AiMarkdown', () => {
  beforeEach(() => {
    track.mockClear();
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
  });

  it('convierte una valla cercada en bloque de código con botón de copiar', () => {
    // Antes salía el texto crudo con los ``` a la vista.
    mount('Mira esto:\n\n```java\nint x = 1;\n```');
    expect(screen.getByLabelText('Copiar código')).toBeTruthy();
    // Prism trocea el código en spans para resaltarlo, así que el texto no vive
    // en un solo nodo: se comprueba sobre el contenido del <pre>.
    expect(document.querySelector('pre').textContent).toContain('int x = 1;');
    expect(document.body.textContent).not.toContain('```');
  });

  it('el botón copia el código al portapapeles', () => {
    mount('```java\nint x = 1;\n```');
    fireEvent.click(screen.getByLabelText('Copiar código'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('int x = 1;');
  });

  it('marca el copiado como procedente de la IA, no de la lección', () => {
    // Copiar del material y copiar la solución que dio el modelo son conductas
    // distintas: mezclarlas estropea H5 y H7.
    mount('```java\nint x = 1;\n```');
    fireEvent.click(screen.getByLabelText('Copiar código'));
    expect(track).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ source: 'ai-response', language: 'java', lines: 1 })
    );
  });

  it('el código en línea no se convierte en bloque', () => {
    mount('usa `@Autowired` aquí');
    expect(screen.queryByLabelText('Copiar código')).toBeNull();
    expect(screen.getByText('@Autowired')).toBeTruthy();
  });

  it('renderiza listas, negritas y enlaces', () => {
    mount('- uno\n- **dos**\n\n[Spring](https://spring.io)');
    expect(screen.getByText('uno')).toBeTruthy();
    expect(screen.getByText('dos').tagName).toBe('STRONG');
    expect(screen.getByText('Spring').closest('a')).toHaveProperty('href', 'https://spring.io/');
  });

  it('renderiza tablas GFM', () => {
    mount('| a | b |\n|---|---|\n| 1 | 2 |');
    expect(screen.getByText('a')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('una valla sin cerrar no rompe el render', () => {
    // Pasa constantemente mientras la respuesta va llegando por streaming.
    expect(() => mount('texto\n\n```java\nint x = 1;')).not.toThrow();
  });
});
