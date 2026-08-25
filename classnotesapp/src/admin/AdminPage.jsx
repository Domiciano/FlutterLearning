// src/admin/AdminPage.jsx
//
// Vista de administrador (solo profesor): cruza la lista de clase con los
// perfiles que hay en Firestore y responde la pregunta operativa del curso —
// quién ya entró, con qué correo y con qué usuario de GitHub, y quién falta.
//
// Es una pantalla completa y va FUERA del Layout de lecciones: no tiene tabla de
// contenidos ni pertenece al temario.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import InsightsIcon from '@mui/icons-material/Insights';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import IconButton from '@mui/material/IconButton';

import { useAuth } from '@/auth/AuthContext';
import { courseId } from '@/auth/firebaseConfig';
import courseConfig from '@/content/config';
import { loginBranding } from '@/auth/loginBranding';
import { useThemeMode } from '@/theme/ThemeContext';
import {
  clearStudentActivityCache,
  fetchRoster,
  fetchStudents,
  listRosters,
  saveRoster,
} from './adminData';
import StudentActivityDrawer from './StudentActivityDrawer';
import { parseRosterMarkdown, parseTermFromFileName, normalizeName } from './rosterParser';
import { matchRoster } from './matchRoster';
import { buildRosterMarkdown, downloadMarkdown, rosterFileName } from './rosterExport';

// Por qué esa fila casó sin que el código coincidiera. El profesor necesita
// saberlo para decidir si le cree al cruce o va a mirar el perfil.
const RAZON_DEL_CRUCE = {
  nombre: 'Casó por el nombre completo.',
  'codigo-typo': 'Casó porque el código del perfil está a un carácter del de la lista: lo tecleó mal.',
  'nombre-parcial': 'Casó porque el nombre del perfil es parte del que trae la lista, y no había otro candidato posible.',
};

const githubOf = (s) =>
  s?.githubUsername ||
  (s?.github ? String(s.github).replace(/^https?:\/\/(www\.)?github\.com\//i, '') : '');

const AdminPage = () => {
  const { theme } = useThemeMode();
  const { user, isTeacher, configured } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [students, setStudents] = useState([]);
  const [rosters, setRosters] = useState([]); // una entrada por semestre, sin `entries`
  const [term, setTerm] = useState('');       // semestre en pantalla
  const [roster, setRoster] = useState(null); // { term, entries, label, updatedAt }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [filter, setFilter] = useState('');
  // El panel de actividad. `abierto` y `seleccionado` van separados para que el
  // contenido no se vacíe a mitad de la animación de cierre.
  const [seleccionado, setSeleccionado] = useState(null); // { student, fila }
  const [panelAbierto, setPanelAbierto] = useState(false);

  const describeError = (err) =>
    err?.code === 'permission-denied'
      ? 'Firestore denegó la lectura. Falta el custom claim `profesor: true` en tu cuenta, o hay que volver a iniciar sesión para que entre en el token.'
      : `No se pudieron cargar los datos: ${err?.message ?? err}`;

  // `preferred` mantiene el semestre elegido al recargar; si ya no existe (o es la
  // primera visita), se abre el más reciente, que es el del curso en marcha.
  const load = useCallback(async (preferred) => {
    setLoading(true);
    setError(null);
    try {
      const [s, list] = await Promise.all([fetchStudents(), listRosters()]);
      setStudents(s);
      setRosters(list);
      if (list.length === 0) {
        setTerm('');
        setRoster(null);
      } else {
        const chosen = (list.find((r) => r.term === preferred) ?? list[0]).term;
        setTerm(chosen);
        setRoster(await fetchRoster(chosen));
      }
    } catch (err) {
      console.error('[Admin] Error cargando los datos:', err);
      setError(describeError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isTeacher) load();
    else setLoading(false);
  }, [isTeacher, load]);

  const onSelectTerm = async (next) => {
    setTerm(next);
    setError(null);
    setNotice(null);
    setLoading(true);
    try {
      setRoster(await fetchRoster(next));
    } catch (err) {
      console.error('[Admin] Error cargando la lista del semestre:', err);
      setError(describeError(err));
    } finally {
      setLoading(false);
    }
  };

  const roll = useMemo(
    () => matchRoster({ roster: roster?.entries ?? [], students }),
    [roster, students]
  );

  const visibleRows = useMemo(() => {
    const q = normalizeName(filter);
    if (!q) return roll.rows;
    return roll.rows.filter((r) => {
      const hay = [r.codigo, r.nombre, r.student?.email, r.student?.fullName, githubOf(r.student)]
        .map((v) => normalizeName(v))
        .join(' ');
      return hay.includes(q);
    });
  }, [roll.rows, filter]);

  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // permite recargar el mismo archivo dos veces seguidas
    if (!file) return;
    setError(null);
    setNotice(null);
    try {
      // El semestre sale del nombre del archivo: `262.md` es la lista del 262. Es
      // lo que separa un documento de otro, así que sin él no se guarda nada —
      // adivinarlo pisaría la lista de otro periodo.
      const fileTerm = parseTermFromFileName(file.name);
      if (!fileTerm) {
        setError(
          `"${file.name}" no dice a qué semestre pertenece. Renómbralo con el periodo, p. ej. "262.md", y vuelve a cargarlo.`
        );
        return;
      }

      const entries = parseRosterMarkdown(await file.text());
      if (entries.length === 0) {
        setError(
          'No se encontró ningún estudiante en ese archivo. Se espera una línea por persona con el código y el nombre completo, p. ej. "A00406656 ANDRES FELIPE RIVAS OSPINA".'
        );
        return;
      }

      const previo = rosters.find((r) => r.term === fileTerm);
      if (
        previo &&
        !window.confirm(
          `Ya hay una lista del semestre ${fileTerm} con ${previo.count} estudiantes. Se reemplaza por las ${entries.length} de "${file.name}". ¿Continuar?`
        )
      ) {
        return;
      }

      await saveRoster({ term: fileTerm, entries, label: file.name, uid: user?.uid });
      const meta = { id: `${courseId}-${fileTerm}`, term: fileTerm, count: entries.length, label: file.name, updatedAt: new Date() };
      setRosters((prev) => [meta, ...prev.filter((r) => r.term !== fileTerm)].sort((a, b) => String(b.term).localeCompare(String(a.term))));
      setTerm(fileTerm);
      setRoster({ ...meta, entries });
      setNotice(`Semestre ${fileTerm}: ${entries.length} estudiantes cargados desde ${file.name}.`);
    } catch (err) {
      console.error('[Admin] Error cargando la lista:', err);
      setError(`No se pudo guardar la lista: ${err?.message ?? err}`);
    }
  };

  // El panel mide contra `courseStartDate`, que es el del semestre en curso. Para
  // un semestre pasado la ventana "desde el inicio" apuntaría a fechas que no son
  // las suyas y saldría vacía, así que no se abre y se dice por qué.
  const esSemestreActual = !term || term === courseConfig.courseTerm;

  const abrirActividad = (student, fila = null) => {
    if (!student?.uid || !esSemestreActual) return;
    setSeleccionado({ student, fila });
    setPanelAbierto(true);
  };

  const onExport = () => {
    const now = new Date();
    downloadMarkdown(
      rosterFileName(courseId, now, term),
      buildRosterMarkdown({
        courseName: loginBranding.courseName,
        roll,
        generatedAt: now,
        rosterLabel: roster?.label,
        term,
      })
    );
  };

  // --- Guardas -------------------------------------------------------------

  const shell = (children) => (
    <Box sx={{ minHeight: '100vh', background: theme.background, color: theme.textPrimary, p: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>{children}</Box>
    </Box>
  );

  if (!configured) {
    return shell(<Alert severity="info">Firebase no está configurado en esta compilación, así que no hay datos que mostrar.</Alert>);
  }

  if (!isTeacher) {
    return shell(
      <>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2, color: theme.accent, textTransform: 'none' }}>
          Volver al curso
        </Button>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Esta vista es solo para el profesor.
        </Alert>
        <Typography sx={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
          El acceso se concede con el custom claim <code>profesor: true</code> sobre tu cuenta de Firebase — el mismo que
          exigen las reglas de Firestore. Se asigna una vez desde el Admin SDK (ver{' '}
          <code>classnotesapp/firestore/README.md</code>) y entra en el token al cerrar y volver a abrir sesión.
        </Typography>
      </>
    );
  }

  // --- Vista ---------------------------------------------------------------

  const statChip = (label, value, color) => (
    <Chip
      label={`${value} ${label}`}
      sx={{
        fontWeight: 700,
        color,
        background: alpha(color, 0.15),
        border: `1px solid ${alpha(color, 0.5)}`,
      }}
    />
  );

  const headCellSx = {
    color: theme.textSecondary,
    fontWeight: 700,
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    borderColor: alpha(theme.textSecondary, 0.25),
    background: theme.backgroundLight,
    whiteSpace: 'nowrap',
  };
  const cellSx = { color: theme.textPrimary, borderColor: alpha(theme.textSecondary, 0.15), fontSize: '0.88rem' };
  const mutedSx = { ...cellSx, color: theme.textSecondary };

  const actividadBtn = (student, fila) => {
    if (!student?.uid) return <span style={{ color: theme.textSecondary }}>—</span>;
    const titulo = esSemestreActual
      ? `Ver actividad de ${fila?.nombre || student.fullName || student.email || 'este estudiante'}`
      : `La actividad solo se puede ver del semestre en curso (${courseConfig.courseTerm})`;
    return (
      <Tooltip title={titulo}>
        {/* El span deja que el tooltip funcione con el botón deshabilitado. */}
        <span>
          <IconButton
            size="small"
            aria-label={titulo}
            disabled={!esSemestreActual}
            onClick={(e) => {
              e.stopPropagation(); // si no, el clic del renglón lo abriría dos veces
              abrirActividad(student, fila);
            }}
            sx={{ color: theme.accent }}
          >
            <InsightsIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    );
  };

  return shell(
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ color: theme.accent, textTransform: 'none' }}>
          Volver al curso
        </Button>
        <Box sx={{ flex: 1 }} />
        {rosters.length > 0 && (
          <TextField
            select
            size="small"
            label="Semestre"
            value={term}
            onChange={(e) => onSelectTerm(e.target.value)}
            sx={{
              minWidth: 170,
              '& .MuiInputBase-input': { color: theme.textPrimary },
              '& .MuiInputLabel-root': { color: theme.textSecondary },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: alpha(theme.textSecondary, 0.4) },
              '& .MuiSvgIcon-root': { color: theme.textSecondary },
            }}
          >
            {rosters.map((r) => (
              <MenuItem key={r.id} value={r.term}>
                {r.term || 'Sin semestre'} · {r.count} est.
              </MenuItem>
            ))}
          </TextField>
        )}
        <Button
          startIcon={<RefreshIcon />}
          onClick={() => {
            clearStudentActivityCache();
            load(term);
          }}
          disabled={loading}
          sx={{ color: theme.textSecondary, textTransform: 'none' }}
        >
          Recargar
        </Button>
        <Button
          startIcon={<UploadFileIcon />}
          onClick={() => fileRef.current?.click()}
          variant="outlined"
          sx={{ textTransform: 'none', color: theme.textPrimary, borderColor: alpha(theme.textSecondary, 0.5) }}
        >
          {roster ? 'Cargar otra lista (.md)' : 'Cargar lista (.md)'}
        </Button>
        <Button
          startIcon={<DownloadIcon />}
          onClick={onExport}
          variant="contained"
          disabled={roll.rows.length === 0 && roll.extras.length === 0}
          sx={{ textTransform: 'none', fontWeight: 700, background: theme.accent, '&:hover': { background: theme.accent, filter: 'brightness(0.94)' } }}
        >
          Generar .md
        </Button>
        <input ref={fileRef} type="file" accept=".md,.markdown,.txt,text/markdown" onChange={onPickFile} style={{ display: 'none' }} />
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, color: theme.textPrimary }}>
        Estudiantes{term ? ` · semestre ${term}` : ''}
      </Typography>
      <Typography sx={{ color: theme.textSecondary, mb: 2, fontSize: '0.9rem' }}>
        {loginBranding.courseName}
        {roster?.label ? ` · lista: ${roster.label}` : ''}
        {roster?.updatedAt ? ` · actualizada el ${roster.updatedAt.toLocaleDateString()}` : ''}
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 3 }}>
          <CircularProgress size={20} sx={{ color: theme.accent }} />
          <Typography sx={{ color: theme.textSecondary }}>Cargando…</Typography>
        </Box>
      )}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
      {notice && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setNotice(null)}>{notice}</Alert>}

      {!loading && (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
            {statChip('en lista', roll.stats.total, theme.textSecondary)}
            {statChip('con cuenta', roll.stats.registrados, theme.success)}
            {statChip('sin ingresar', roll.stats.pendientes, theme.warning)}
            {roll.stats.extras > 0 && statChip('fuera de la lista', roll.stats.extras, theme.accent)}
          </Box>

          {!roster && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Todavía no hay lista de clase cargada. Súbela con <strong>Cargar lista (.md)</strong> — un archivo con una
              persona por línea, <code>código nombre completo</code> y sin encabezado, p. ej.{' '}
              <code>students/262.md</code>. <strong>El nombre del archivo es el semestre</strong>: se guarda una lista
              por periodo, así que <code>262.md</code> no pisa la del semestre anterior. Se guarda en Firestore y solo la
              lee tu cuenta, así que los nombres y códigos no viajan al sitio público.
            </Alert>
          )}

          <TextField
            size="small"
            placeholder="Filtrar por nombre, código, correo o GitHub…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              mb: 2,
              width: { xs: '100%', sm: 380 },
              '& .MuiInputBase-input': { color: theme.textPrimary },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: alpha(theme.textSecondary, 0.4) },
            }}
          />

          <TableContainer component={Paper} sx={{ background: theme.backgroundLight, mb: 4, borderRadius: 2, border: `1px solid ${alpha(theme.textSecondary, 0.2)}` }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={headCellSx}>Código</TableCell>
                  <TableCell sx={headCellSx}>Nombre (lista)</TableCell>
                  <TableCell sx={headCellSx}>Correo</TableCell>
                  <TableCell sx={headCellSx}>GitHub</TableCell>
                  <TableCell sx={headCellSx}>Nombre en el perfil</TableCell>
                  <TableCell sx={headCellSx}>Estado</TableCell>
                  <TableCell sx={headCellSx} align="right">Actividad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ ...mutedSx, textAlign: 'center', py: 4 }}>
                      {roster ? 'Ningún estudiante coincide con el filtro.' : 'Carga la lista de clase para ver esta tabla.'}
                    </TableCell>
                  </TableRow>
                )}
                {visibleRows.map((r) => {
                  const s = r.student;
                  const gh = githubOf(s);
                  const clicable = !!s && esSemestreActual;
                  return (
                    <TableRow
                      key={`${r.codigo}-${r.nombre}`}
                      hover
                      onClick={clicable ? () => abrirActividad(s, r) : undefined}
                      sx={{ opacity: s ? 1 : 0.72, cursor: clicable ? 'pointer' : 'default' }}
                    >
                      <TableCell sx={{ ...cellSx, fontFamily: 'monospace' }}>{r.codigo || '—'}</TableCell>
                      <TableCell sx={cellSx}>{r.nombre}</TableCell>
                      <TableCell sx={s ? cellSx : mutedSx}>{s?.email || '—'}</TableCell>
                      <TableCell sx={cellSx}>
                        {gh ? (
                          <Link href={`https://github.com/${gh}`} target="_blank" rel="noreferrer" sx={{ color: theme.accent }}>
                            {gh}
                          </Link>
                        ) : (
                          <span style={{ color: theme.textSecondary }}>—</span>
                        )}
                      </TableCell>
                      <TableCell sx={mutedSx}>{s?.fullName || '—'}</TableCell>
                      <TableCell sx={cellSx}>
                        {!s ? (
                          <Chip size="small" label="Sin ingresar" sx={{ color: theme.warning, background: alpha(theme.warning, 0.15), fontWeight: 600 }} />
                        ) : r.codigoMismatch ? (
                          <Tooltip
                            title={`El perfil declara el código "${s.codigo || '(vacío)'}". ${
                              RAZON_DEL_CRUCE[r.matchedBy] ?? 'Casó por nombre.'
                            }`}
                          >
                            <Chip
                              size="small"
                              icon={<WarningAmberIcon style={{ color: theme.warning }} />}
                              label="Revisar código"
                              sx={{ color: theme.warning, background: alpha(theme.warning, 0.15), fontWeight: 600 }}
                            />
                          </Tooltip>
                        ) : (
                          <Chip size="small" label="Registrado" sx={{ color: theme.success, background: alpha(theme.success, 0.15), fontWeight: 600 }} />
                        )}
                      </TableCell>
                      <TableCell sx={cellSx} align="right">
                        {/* El clic en el renglón es el atajo de ratón; este botón es
                            el único camino por teclado, porque TableRow no es
                            focalizable. */}
                        {actividadBtn(s, r)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: theme.textPrimary }}>
            Fuera de la lista ({roll.extras.length})
          </Typography>
          <Typography sx={{ color: theme.textSecondary, mb: 1.5, fontSize: '0.85rem' }}>
            Cuentas que entraron al visor y no aparecen en la lista de clase: oyentes, otra sección, tu propia cuenta —
            o alguien que escribió mal su código y arriba figura como ausente.
          </Typography>
          <TableContainer component={Paper} sx={{ background: theme.backgroundLight, borderRadius: 2, border: `1px solid ${alpha(theme.textSecondary, 0.2)}` }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={headCellSx}>Nombre</TableCell>
                  <TableCell sx={headCellSx}>Correo</TableCell>
                  <TableCell sx={headCellSx}>Código declarado</TableCell>
                  <TableCell sx={headCellSx}>GitHub</TableCell>
                  <TableCell sx={headCellSx}>Rol</TableCell>
                  <TableCell sx={headCellSx} align="right">Actividad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roll.extras.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ ...mutedSx, textAlign: 'center', py: 3 }}>
                      Nadie por fuera de la lista.
                    </TableCell>
                  </TableRow>
                )}
                {roll.extras.map((s) => {
                  const gh = githubOf(s);
                  return (
                    <TableRow
                      key={s.uid}
                      hover
                      onClick={esSemestreActual ? () => abrirActividad(s) : undefined}
                      sx={{ cursor: esSemestreActual ? 'pointer' : 'default' }}
                    >
                      <TableCell sx={cellSx}>{s.fullName || s.displayName || '—'}</TableCell>
                      <TableCell sx={cellSx}>{s.email || '—'}</TableCell>
                      <TableCell sx={{ ...mutedSx, fontFamily: 'monospace' }}>{s.codigo || '—'}</TableCell>
                      <TableCell sx={cellSx}>
                        {gh ? (
                          <Link href={`https://github.com/${gh}`} target="_blank" rel="noreferrer" sx={{ color: theme.accent }}>
                            {gh}
                          </Link>
                        ) : (
                          <span style={{ color: theme.textSecondary }}>—</span>
                        )}
                      </TableCell>
                      <TableCell sx={mutedSx}>{s.roleOther || s.role || '—'}</TableCell>
                      <TableCell sx={cellSx} align="right">{actividadBtn(s, null)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <StudentActivityDrawer
        open={panelAbierto}
        student={seleccionado?.student ?? null}
        fila={seleccionado?.fila ?? null}
        onClose={() => setPanelAbierto(false)}
      />
    </>
  );
};

export default AdminPage;
