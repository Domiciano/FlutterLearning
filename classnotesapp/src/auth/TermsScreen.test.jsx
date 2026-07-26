import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

const acceptTerms = vi.fn().mockResolvedValue(undefined);
const signOutUser = vi.fn();

vi.mock('./AuthContext', () => ({
  useAuth: () => ({ user: { email: 'a@icesi.edu.co' }, acceptTerms, signOutUser }),
}));

// LoginBackground arrastra imágenes y animaciones que no aportan a esta prueba.
vi.mock('./LoginBackground', () => ({ default: () => null }));
vi.mock('@/assets/icesi-logo.svg', () => ({ default: 'logo.svg' }));

const { default: TermsScreen } = await import('./TermsScreen');
const { ThemeProvider } = await import('@/theme/ThemeContext');

const mount = () => render(<ThemeProvider><TermsScreen /></ThemeProvider>);

const checkbox = () => screen.getByRole('checkbox');
const acceptButton = () => screen.getByRole('button', { name: /Aceptar y continuar/i });

// jsdom no hace layout: scrollHeight/clientHeight son 0, así que la caja parece
// "ya leída". Estas ayudas fingen una caja con contenido que sobra.
const scrollBox = () => document.querySelector('[tabindex="0"]');

const fakeMetrics = (el, { scrollTop, scrollHeight, clientHeight }) => {
  Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, configurable: true });
  Object.defineProperty(el, 'clientHeight', { value: clientHeight, configurable: true });
  Object.defineProperty(el, 'scrollTop', { value: scrollTop, writable: true, configurable: true });
};

describe('TermsScreen', () => {
  beforeEach(() => {
    acceptTerms.mockClear();
    signOutUser.mockClear();
  });

  it('muestra el documento completo', () => {
    mount();
    expect(screen.getByText(/1\. Qué es esta plataforma/)).toBeTruthy();
    expect(screen.getByText(/9\. Contacto/)).toBeTruthy();
  });

  it('no deja aceptar hasta haber desplazado el documento hasta el final', () => {
    mount();
    const box = scrollBox();

    fakeMetrics(box, { scrollTop: 0, scrollHeight: 2000, clientHeight: 400 });
    fireEvent.scroll(box);
    expect(checkbox().disabled).toBe(true);
    expect(acceptButton().disabled).toBe(true);

    fakeMetrics(box, { scrollTop: 1600, scrollHeight: 2000, clientHeight: 400 });
    fireEvent.scroll(box);
    expect(checkbox().disabled).toBe(false);
    // Leer no basta: sigue haciendo falta marcar la casilla.
    expect(acceptButton().disabled).toBe(true);
  });

  it('registra la aceptación solo con la casilla marcada', async () => {
    mount();
    const box = scrollBox();
    fakeMetrics(box, { scrollTop: 1600, scrollHeight: 2000, clientHeight: 400 });
    fireEvent.scroll(box);

    fireEvent.click(checkbox());
    expect(acceptButton().disabled).toBe(false);

    await act(async () => { fireEvent.click(acceptButton()); });
    expect(acceptTerms).toHaveBeenCalledTimes(1);
  });

  it('rechazar cierra la sesión y no registra consentimiento', () => {
    mount();
    fireEvent.click(screen.getByRole('button', { name: /No acepto/i }));
    expect(signOutUser).toHaveBeenCalledTimes(1);
    expect(acceptTerms).not.toHaveBeenCalled();
  });
});
