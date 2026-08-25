// src/admin/ActivityBars.jsx
//
// Minutos activos por día, una barra por día. Sin librería de gráficas: el
// proyecto no tiene ninguna y meter una (y sus 300 KB) para dibujar rectángulos
// no se paga.
//
// Un solo componente para las dos ventanas del panel —7 días y semestre—, porque
// dos implementaciones se desincronizan a la primera corrección.
//
// ## Por qué el SVG no lleva texto dentro
//
// `preserveAspectRatio="none"` deja que los rectángulos se estiren al ancho que
// haya sin perder significado (una barra el doble de alta sigue siendo el doble
// de minutos), pero deformaría cualquier texto. Así que dentro del SVG solo van
// barras, y las etiquetas van en HTML, en una rejilla de la misma anchura.
//
// ## Accesibilidad
//
// El `<svg>` va `aria-hidden` y al lado hay una tabla visualmente oculta con una
// fila por día. Un solo camino para el lector de pantalla —no `role="img"` *y*
// tabla, que lo leería dos veces—, y de paso el contenido se puede copiar.

import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import { diaSemana, etiquetaCorta } from './activityCalendar';

const UNIDADES_POR_DIA = 4;
const ANCHO_BARRA = 3;
const ALTO = 100;
/** Los días de 0 se dibujan igual: si no, "sin actividad" y "fuera de rango" se ven igual. */
const BASE = 2;

const soloVisualmenteOculto = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
};

const redondear = (v) => Math.round(v * 10) / 10;

/**
 * @param {object} props
 * @param {{day:string, minutos:number, activo:boolean}[]} props.dias  toda la ventana, huecos incluidos
 * @param {string} props.hoy         para marcar la barra de hoy con contorno
 * @param {number|null} props.referencia  línea punteada (mediana de los días activos del semestre)
 * @param {'dias'|'semanas'} props.etiquetas  cada día, o una marca cada 7
 * @param {string} props.titulo      leyenda de la tabla accesible
 */
const ActivityBars = ({ dias = [], hoy, referencia = null, etiquetas = 'dias', titulo = 'Minutos activos por día' }) => {
  const { theme } = useThemeMode();

  const max = useMemo(() => Math.max(0, ...dias.map((d) => d.minutos)), [dias]);
  const ancho = Math.max(1, dias.length) * UNIDADES_POR_DIA;

  // Escala propia de cada bloque. La ventana de 7 días con la escala del semestre
  // saldría casi plana; por eso cada gráfica rotula su máximo y comparten en
  // cambio la línea de referencia.
  const alturaDe = (min) => (max <= 0 ? BASE : Math.max(BASE, (min / max) * ALTO));

  if (dias.length === 0) return null;

  return (
    <Box sx={{ mt: 1 }}>
      <svg
        viewBox={`0 0 ${ancho} ${ALTO}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ width: '100%', height: 96, display: 'block' }}
      >
        <rect x="0" y="0" width={ancho} height={ALTO} fill={alpha(theme.textSecondary, 0.07)} />

        {/* Separadores de semana: sin ellos, 100 barras seguidas no se leen. */}
        {dias.map((d, i) =>
          i > 0 && i % 7 === 0 ? (
            <line
              key={`sep-${d.day}`}
              x1={i * UNIDADES_POR_DIA - 0.5}
              x2={i * UNIDADES_POR_DIA - 0.5}
              y1="0"
              y2={ALTO}
              stroke={alpha(theme.textSecondary, 0.22)}
              strokeWidth="0.4"
            />
          ) : null
        )}

        {referencia > 0 && max > 0 && (
          <line
            x1="0"
            x2={ancho}
            y1={ALTO - (referencia / max) * ALTO}
            y2={ALTO - (referencia / max) * ALTO}
            stroke={alpha(theme.textSecondary, 0.5)}
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        )}

        {dias.map((d, i) => {
          const h = alturaDe(d.minutos);
          const esHoy = d.day === hoy;
          return (
            <rect
              key={d.day}
              x={i * UNIDADES_POR_DIA}
              y={ALTO - h}
              width={ANCHO_BARRA}
              height={h}
              fill={d.minutos > 0 ? theme.accent : alpha(theme.textSecondary, 0.25)}
              stroke={esHoy ? theme.textPrimary : 'none'}
              strokeWidth={esHoy ? 0.6 : 0}
            >
              {/* Tooltip nativo: sin JS, sin estado y funciona en cualquier sitio. */}
              <title>{`${etiquetaCorta(d.day)} · ${redondear(d.minutos)} min`}</title>
            </rect>
          );
        })}
      </svg>

      {/* Etiquetas fuera del SVG, para que no las deforme el estirado. */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${dias.length}, 1fr)`,
          mt: 0.5,
        }}
      >
        {dias.map((d, i) => {
          const visible = etiquetas === 'dias' || i % 7 === 0;
          return (
            <Typography
              key={d.day}
              sx={{
                fontSize: '0.62rem',
                color: theme.textSecondary,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                visibility: visible ? 'visible' : 'hidden',
              }}
            >
              {etiquetas === 'dias' ? diaSemana(d.day) : `S${Math.floor(i / 7) + 1}`}
            </Typography>
          );
        })}
      </Box>

      <Typography sx={{ fontSize: '0.7rem', color: theme.textSecondary, mt: 0.5 }}>
        {max > 0
          ? `máx. ${redondear(max)} min${referencia > 0 ? ` · la línea es la mediana de los días activos del semestre (${redondear(referencia)} min)` : ''}`
          : 'sin minutos registrados en esta ventana'}
      </Typography>

      <Box component="table" sx={soloVisualmenteOculto}>
        <caption>{`${titulo}, ${etiquetaCorta(dias[0].day)} a ${etiquetaCorta(dias[dias.length - 1].day)}`}</caption>
        <tbody>
          {dias.map((d) => (
            <tr key={d.day}>
              <th scope="row">{d.day}</th>
              <td>{`${redondear(d.minutos)} minutos`}</td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
};

export default ActivityBars;
