// src/admin/StudentActivityDrawer.jsx
//
// El panel que se abre al pulsar un renglón de la lista: qué ha hecho ese
// estudiante, día a día, en dos ventanas a la vez — los últimos 7 días arriba
// (lo accionable hoy) y todo el semestre debajo (lo normal en él).
//
// Va en un `Drawer` y no en una ruta propia porque el uso real es recorrer la
// lista: abrir, mirar diez segundos, cerrar, siguiente. Una página completa
// obligaría a volver atrás entre estudiante y estudiante.
//
// Aquí no se calcula ningún indicador: todos salen de `studentActivity.js`, que
// es puro y está probado aparte. Este archivo solo pide los datos y los coloca.

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import courseConfig from '@/content/config';
import { useThemeMode } from '@/theme/ThemeContext';
import { fetchStudentActivity } from './adminData';
import { loadCourseSchedule } from './courseSchedule';
import { summarizeStudentActivity } from './studentActivity';
import { dayKeyToUtcMs, etiquetaCorta, localTzOffsetMinutes } from './activityCalendar';
import ActivityBars from './ActivityBars';

const ANCHO = { xs: '100%', sm: 520 };

const redondear = (v, d = 1) => (v === null || v === undefined ? null : Math.round(v * 10 ** d) / 10 ** d);
const fmt = (v, sufijo = '') => (v === null || v === undefined ? '—' : `${redondear(v)}${sufijo}`);

/** Mediana de los días con actividad. Sirve de referencia comparable entre ventanas. */
const medianaActivos = (dias) => {
  const xs = dias.filter((d) => d.activo).map((d) => d.minutos).sort((a, b) => a - b);
  if (xs.length === 0) return null;
  const m = Math.floor(xs.length / 2);
  return xs.length % 2 ? xs[m] : (xs[m - 1] + xs[m]) / 2;
};

const Dato = ({ label, valor, detalle, ayuda, color }) => {
  const { theme } = useThemeMode();
  const cuerpo = (
    <Box sx={{ minWidth: 96 }}>
      <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: color ?? theme.textPrimary, lineHeight: 1.2 }}>
        {valor}
      </Typography>
      <Typography sx={{ fontSize: '0.7rem', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
        {label}
      </Typography>
      {detalle && (
        <Typography sx={{ fontSize: '0.72rem', color: theme.textSecondary }}>{detalle}</Typography>
      )}
    </Box>
  );
  return ayuda ? <Tooltip title={ayuda}>{cuerpo}</Tooltip> : cuerpo;
};

const Grupo = ({ titulo, children }) => {
  const { theme } = useThemeMode();
  return (
    <Box sx={{ mb: 1.75 }}>
      <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>
        {titulo}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>{children}</Box>
    </Box>
  );
};

const StudentActivityDrawer = ({ open, student, fila, onClose }) => {
  const { theme } = useThemeMode();
  const [estado, setEstado] = useState({ cargando: false, error: null, datos: null, meta: null });

  const uid = student?.uid ?? null;

  const cargar = useCallback(async () => {
    if (!uid) return;
    setEstado({ cargando: true, error: null, datos: null, meta: null });
    try {
      const tzOffsetMin = localTzOffsetMinutes();
      // El inicio del semestre a medianoche local: el filtro va contra `serverTs`,
      // que es hora de servidor, así que hay que deshacer el desplazamiento.
      const desde = new Date(dayKeyToUtcMs(courseConfig.courseStartDate) - tzOffsetMin * 60_000);

      const [schedule, actividad] = await Promise.all([
        loadCourseSchedule().catch((err) => {
          // Sin temario el panel sigue sirviendo: se pierde H3, no el resto.
          console.warn('[Admin] No se pudo cargar el temario, el retraso quedará vacío:', err);
          return null;
        }),
        fetchStudentActivity(uid, { since: desde }),
      ]);

      setEstado({
        cargando: false,
        error: null,
        datos: summarizeStudentActivity({
          batches: actividad.batches,
          prompts: actividad.prompts,
          schedule,
          courseStartDate: courseConfig.courseStartDate,
          now: Date.now(),
          tzOffsetMin,
        }),
        meta: { docsRead: actividad.docsRead, fromCache: actividad.fromCache },
      });
    } catch (err) {
      console.error('[Admin] Error cargando la actividad:', err);
      setEstado({
        cargando: false,
        error:
          err?.code === 'permission-denied'
            ? 'Firestore denegó la lectura. Falta el custom claim `profesor: true` en tu cuenta, o hay que volver a iniciar sesión para que entre en el token.'
            : `No se pudo cargar la actividad: ${err?.message ?? err}`,
        datos: null,
        meta: null,
      });
    }
  }, [uid]);

  useEffect(() => {
    if (open && uid) cargar();
  }, [open, uid, cargar]);

  const datos = estado.datos;
  const referencia = useMemo(
    () => (datos ? medianaActivos(datos.semestre.dias) : null),
    [datos]
  );

  const nombre = fila?.nombre || student?.fullName || student?.displayName || '—';
  const gh = student?.githubUsername || '';

  const bloque = (titulo, w, { esSemestre }) => {
    const c = w.constancia;
    const t = w.temario;
    const le = w.lectura;
    const p = w.practica;

    const colorRetraso =
      t.retrasoMedio === null ? undefined
        : t.retrasoMedio <= 6 ? theme.success
        : t.retrasoMedio < 14 ? theme.warning
        : theme.error;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 800, color: theme.textPrimary, mb: 0.25 }}>{titulo}</Typography>
        <Typography sx={{ fontSize: '0.72rem', color: theme.textSecondary, mb: 1.25 }}>
          {etiquetaCorta(w.desde)} – {etiquetaCorta(w.hasta)}
        </Typography>

        <Grupo titulo="Constancia">
          <Dato
            label="min activos"
            valor={fmt(c.minutosActivos)}
            detalle={c.mediaPorDiaActivo ? `${redondear(c.mediaPorDiaActivo)} min/día activo` : null}
            ayuda="Suma del tiempo activo de cada visita a una lección, ya descontado el tiempo inactivo."
          />
          <Dato
            label="días activos"
            valor={`${c.diasActivos} de ${c.nDias}`}
            ayuda="Un día cuenta a partir de 2 minutos: por debajo suele ser un clic equivocado en el índice."
          />
          {esSemestre && (
            <Dato
              label="racha"
              valor={c.racha}
              ayuda="Días de calendario seguidos con actividad, contando hacia atrás desde hoy (o desde ayer si hoy aún no ha entrado). Incluye fines de semana: mide hábito, no asistencia."
            />
          )}
          <Dato
            label="regularidad"
            valor={fmt(c.regularidad === null ? null : c.regularidad, '')}
            detalle={`0–1 sobre ${c.nDias} días`}
            ayuda="1 = el tiempo está repartido por igual entre todos los días de la ventana; 0 = todo en un solo día. No es comparable entre las dos ventanas, porque el número de días difiere."
          />
        </Grupo>

        <Grupo titulo="Al día con el temario">
          <Dato
            label="retraso medio"
            valor={t.retrasoMedio === null ? '—' : `${redondear(t.retrasoMedio)} d`}
            detalle={`sobre ${t.leccionesConRetraso} lecciones`}
            color={colorRetraso}
            ayuda="Días entre el lunes de la semana en que estaba programada cada lección y el día en que la abrió por primera vez. Negativo = se adelantó. Solo cuenta las lecciones que llegó a abrir: mírelo junto a la cobertura."
          />
          {esSemestre ? (
            <Dato
              label="cobertura"
              valor={t.cobertura ? `${t.cobertura.vistas} de ${t.cobertura.vencidas}` : '—'}
              detalle="lecciones ya vencidas"
              ayuda="De las lecciones cuya semana ya pasó, cuántas ha abierto. Es el denominador que hace interpretable el retraso medio."
            />
          ) : (
            <Dato
              label="lecciones nuevas"
              valor={t.nuevas ?? 0}
              detalle="estrenadas esta semana"
              ayuda="Lecciones que abrió por primera vez en estos 7 días. Dice si se está poniendo al día o alejándose."
            />
          )}
        </Grupo>

        <Grupo titulo="Profundidad de lectura">
          <Dato
            label="lecciones"
            valor={le.totalLecciones ? `${le.leccionesAbiertas} de ${le.totalLecciones}` : le.leccionesAbiertas}
            ayuda="Lecciones distintas que tocó en esta ventana, sobre el total del temario."
          />
          <Dato
            label="scroll medio"
            valor={fmt(le.scrollMedio, '%')}
            detalle={le.abandonadas ? `${le.abandonadas} abandonadas antes del 50 %` : null}
            ayuda="Por lección se toma la visita que más bajó, no el promedio de las visitas: volver a mirar el principio es un repaso legítimo. Es un límite superior — una lección que cabe en pantalla cuenta como 100 %."
          />
          <Dato
            label="marcadas"
            valor={le.marcadas}
            detalle="como estudiadas"
            ayuda="Estado final de cada lección en la ventana: marcar y desmarcar no suma."
          />
        </Grupo>

        <Grupo titulo="Práctica y asistente">
          <Dato
            label="ejecuciones"
            valor={p.ejecuciones}
            ayuda={`Veces que pasó a ejecutar código: ${p.trycodeRun} en "Fire it up!" y ${p.dartpadOpens} en DartPad.`}
          />
          <Dato
            label="copias"
            valor={p.copias}
            detalle={p.copiasIa ? `${p.copiasIa} de la respuesta de la IA` : null}
            ayuda="Bloques de código copiados. Copiar del material es estudiar; copiar la respuesta del modelo es otra conducta, y por eso van separadas."
          />
          <Dato
            label="prompts"
            valor={p.prompts}
            detalle={p.conversaciones ? `${p.conversaciones} conversaciones` : null}
            ayuda={
              p.turnosPorConversacion
                ? `${redondear(p.turnosPorConversacion)} turnos por conversación. Muchas preguntas sueltas y pocas conversaciones largas son conductas distintas.`
                : 'Preguntas al asistente en esta ventana.'
            }
          />
        </Grupo>

        <ActivityBars
          dias={w.dias}
          hoy={datos.hoy}
          referencia={esSemestre ? null : referencia}
          etiquetas={esSemestre ? 'semanas' : 'dias'}
          titulo={`Minutos activos por día — ${titulo}`}
        />
      </Box>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: ANCHO, background: theme.background, backgroundImage: 'none' } } }}
    >
      <Box sx={{ p: 2.5, color: theme.textPrimary }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {nombre}
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: theme.textSecondary, wordBreak: 'break-word' }}>
              {[fila?.codigo, student?.email].filter(Boolean).join(' · ') || '—'}
            </Typography>
            {gh && (
              <Link
                href={`https://github.com/${gh}`}
                target="_blank"
                rel="noreferrer"
                sx={{ color: theme.accent, fontSize: '0.8rem' }}
              >
                {gh}
              </Link>
            )}
          </Box>
          <IconButton onClick={onClose} aria-label="Cerrar" sx={{ color: theme.textSecondary }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {estado.cargando && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 4 }}>
            <CircularProgress size={20} sx={{ color: theme.accent }} />
            <Typography sx={{ color: theme.textSecondary }}>Leyendo la actividad…</Typography>
          </Box>
        )}

        {estado.error && <Alert severity="error" sx={{ mb: 2 }}>{estado.error}</Alert>}

        {datos?.sinDatos && (
          // Deliberadamente no se pintan gráficas de ceros: un cero que en realidad
          // significa "no dio consentimiento" es una mentira al lado del nombre de
          // una persona.
          <Alert severity="info" sx={{ mb: 2 }}>
            Sin datos de actividad. O no aceptó el consentimiento de analítica, o no ha entrado al visor desde que
            empezó el semestre.
          </Alert>
        )}

        {datos && !datos.sinDatos && (
          <>
            {datos.asistenteNoActivado && (
              <Chip
                size="small"
                label="No activó el asistente"
                sx={{ mb: 1.5, color: theme.textSecondary, background: alpha(theme.textSecondary, 0.14) }}
              />
            )}

            {bloque('Últimos 7 días', datos.semana, { esSemestre: false })}
            <Divider sx={{ borderColor: alpha(theme.textSecondary, 0.2), mb: 2.5 }} />
            {bloque(`Desde el inicio (${etiquetaCorta(courseConfig.courseStartDate)})`, datos.semestre, { esSemestre: true })}
          </>
        )}

        {datos && (
          // El pie no es decorativo: son las cuatro salvedades sin las cuales estos
          // números se leen como si fueran exactos, y no lo son.
          <Typography sx={{ fontSize: '0.68rem', color: theme.textSecondary, lineHeight: 1.6 }}>
            Días en la hora local de este navegador. <strong>Hoy sale siempre corto</strong>: la lección que esté
            abierta ahora mismo no ha registrado aún su tiempo. Un día del pasado puede ganar minutos días después,
            cuando llega una tanda que se quedó en el navegador del estudiante. El retraso se mide contra el temario
            de hoy, así que mover una lección de semana recalcula su historia. Datos recogidos con el consentimiento
            aceptado en los términos.
            {estado.meta && (
              <>
                {' '}
                <em>{estado.meta.fromCache ? 'Leído de la caché de esta sesión.' : `${estado.meta.docsRead} documentos leídos.`}</em>
              </>
            )}
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default StudentActivityDrawer;
