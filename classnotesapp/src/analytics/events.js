// src/analytics/events.js
//
// Única fuente de nombres de tipo de evento. Un `type` escrito a mano dentro de
// un componente es un evento que nadie encuentra después en el análisis, así que
// todo lo que se emite sale de aquí.
//
// Los nombres son exactamente los de `analitics/datadict.md` § 2. Si cambian allí,
// cambian aquí — y en ningún otro sitio del código.

export const EVENTS = Object.freeze({
  // § 2.1 — Sesión, actividad e inactividad
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
  IDLE_START: 'idle_start',
  IDLE_END: 'idle_end',
  VISIBILITY_CHANGE: 'visibility_change',

  // § 2.2 — Navegación y lectura
  LESSON_OPEN: 'lesson_open',
  LESSON_DWELL: 'lesson_dwell',
  SUBSECTION_DWELL: 'subsection_dwell',
  SCROLL_DEPTH: 'scroll_depth',
  TOC_SUBTITLE_CLICK: 'toc_subtitle_click',
  DRAWER_SECTION_TOGGLE: 'drawer_section_toggle',

  // § 2.3 — Interacción con el código
  CODE_COPY: 'code_copy',
  TRYCODE_TAB_SWITCH: 'trycode_tab_switch',
  DARTPAD_OPEN: 'dartpad_open',
  DARTPAD_DWELL: 'dartpad_dwell',

  // § 2.4 — Autorregulación
  LESSON_MARKED_STUDIED: 'lesson_marked_studied',
  LESSON_UNMARKED_STUDIED: 'lesson_unmarked_studied',
  THEME_TOGGLE: 'theme_toggle',

  // § 2.5 — Autoexamen (F3)
  QUIZ_START: 'quiz_start',
  QUIZ_ITEM_ANSWER: 'quiz_item_answer',
  QUIZ_SUBMIT: 'quiz_submit',
  QUIZ_REVIEW_OPENED: 'quiz_review_opened',

  // § 2.6 — Prompts a la IA (F2)
  PROMPT_CREATED: 'prompt_created',
  AI_RESPONSE_RECEIVED: 'ai_response_received',
  PROMPT_REUSED: 'prompt_reused',
  AI_KEY_CONNECTED: 'ai_key_connected',
});

// Valores cerrados de los payloads que el diccionario define como enumerados.
// Se exportan para que el sitio que emite el evento no invente una variante
// ("Fire it up!" en vez de "run") que luego no case con ninguna categoría.

export const LESSON_ORIGIN = Object.freeze({
  DRAWER: 'drawer',
  TOC: 'toc',
  DEEPLINK: 'deeplink',
  HISTORY: 'history',
});

export const VISIBILITY_STATE = Object.freeze({
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
});

export const TRYCODE_TAB = Object.freeze({
  CODE: 'code',
  RUN: 'run',
});

export const THEME_MODE = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
});

export const SCROLL_MILESTONES = Object.freeze([25, 50, 75, 100]);

export const ALL_EVENT_TYPES = Object.freeze(Object.values(EVENTS));

export const isKnownEventType = (type) => ALL_EVENT_TYPES.includes(type);
