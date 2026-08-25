import { describe, it, expect } from 'vitest';
import { matchRoster } from './matchRoster';

const roster = [
  { codigo: 'A00406656', nombre: 'ANDRES FELIPE RIVAS OSPINA' },
  { codigo: 'A00403756', nombre: 'DAYANNA FERNANDEZ NUÑEZ' },
  { codigo: 'A00404256', nombre: 'XILENA VIDAL RAMIREZ' },
];

const student = (over) => ({
  uid: 'u?',
  role: 'estudiante',
  email: 'x@icesi.edu.co',
  ...over,
});

describe('matchRoster', () => {
  it('empareja por código y marca sin ingresar al resto', () => {
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'u1', codigo: 'A00406656', fullName: 'Andrés Rivas' })],
    });

    expect(roll.stats).toEqual({ total: 3, registrados: 1, pendientes: 2, extras: 0 });
    expect(roll.rows[0].registered).toBe(true);
    expect(roll.rows[0].matchedBy).toBe('codigo');
    expect(roll.rows[0].student.uid).toBe('u1');
    expect(roll.rows[1].registered).toBe(false);
    expect(roll.rows[1].student).toBeNull();
  });

  it('empareja por nombre cuando el código no coincide, y lo señala', () => {
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'u2', codigo: 'A0040375', fullName: 'Dayanna Fernández Núñez' })],
    });

    const row = roll.rows[1];
    expect(row.registered).toBe(true);
    expect(row.matchedBy).toBe('nombre');
    expect(row.codigoMismatch).toBe(true);
    expect(roll.extras).toHaveLength(0);
  });

  it('empareja aunque el perfil invierta el orden de los apellidos', () => {
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'u3', codigo: '', fullName: 'Vidal Ramirez Xilena' })],
    });
    expect(roll.rows[2].registered).toBe(true);
    expect(roll.rows[2].matchedBy).toBe('nombre');
  });

  it('el código gana sobre el nombre aunque el nombre esté antes en la lista', () => {
    // u9 casa por nombre con la fila 0, pero su código es el de la fila 1.
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'u9', codigo: 'A00403756', fullName: 'ANDRES FELIPE RIVAS OSPINA' })],
    });
    expect(roll.rows[0].registered).toBe(false);
    expect(roll.rows[1].student.uid).toBe('u9');
    expect(roll.rows[1].matchedBy).toBe('codigo');
  });

  it('nadie ocupa dos filas: el segundo perfil duplicado queda fuera de la lista', () => {
    const roll = matchRoster({
      roster,
      students: [
        student({ uid: 'u1', codigo: 'A00406656', fullName: 'Andres Rivas' }),
        student({ uid: 'u1b', codigo: 'A00406656', fullName: 'Andres Rivas Ospina' }),
      ],
    });
    expect(roll.rows[0].student.uid).toBe('u1');
    expect(roll.extras.map((s) => s.uid)).toEqual(['u1b']);
  });

  it('quien no está en la lista cae en extras (oyentes, profesor)', () => {
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'p1', role: 'profesor', fullName: 'Domiciano Rincón', codigo: null })],
    });
    expect(roll.stats.registrados).toBe(0);
    expect(roll.stats.extras).toBe(1);
    expect(roll.extras[0].uid).toBe('p1');
  });

  it('sin lista cargada, todos los perfiles son extras', () => {
    const roll = matchRoster({ roster: [], students: [student({ uid: 'u1' })] });
    expect(roll.rows).toEqual([]);
    expect(roll.stats).toEqual({ total: 0, registrados: 0, pendientes: 0, extras: 1 });
  });

  it('no revienta sin argumentos', () => {
    expect(matchRoster().stats).toEqual({ total: 0, registrados: 0, pendientes: 0, extras: 0 });
  });
});

// Casos vistos en el 262: el estudiante llena mal el formulario y termina a la
// vez ausente arriba y desconocido en "fuera de la lista".
describe('matchRoster — el perfil trae el dato mal escrito', () => {
  it('rescata a quien tecleó mal un dígito del código', () => {
    const roll = matchRoster({
      roster,
      // A0040256 le falta un 4 frente a A00404256.
      students: [student({ uid: 'x', codigo: 'A0040256', fullName: 'Xilena Vidal' })],
    });
    expect(roll.rows[2].student.uid).toBe('x');
    expect(roll.rows[2].matchedBy).toBe('codigo-typo');
    expect(roll.rows[2].codigoMismatch).toBe(true); // sigue saliendo "Revisar código"
    expect(roll.extras).toEqual([]);
  });

  it('rescata a quien escribió su nombre corto y en el campo del código puso su nombre', () => {
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'm', codigo: 'Mateo Berrio', fullName: 'Mateo Berrio' })],
      // La lista de este bloque no tiene a Mateo; se añade aquí.
    });
    expect(roll.extras.map((s) => s.uid)).toEqual(['m']);

    const conMateo = matchRoster({
      roster: [...roster, { codigo: 'A00399867', nombre: 'MATEO BERRIO VILLA' }],
      students: [student({ uid: 'm', codigo: 'Mateo Berrio', fullName: 'Mateo Berrio' })],
    });
    expect(conMateo.rows[3].student.uid).toBe('m');
    expect(conMateo.rows[3].matchedBy).toBe('nombre-parcial');
    expect(conMateo.extras).toEqual([]);
  });

  it('el nombre parcial casa aunque el perfil no declare ningún código', () => {
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'd', codigo: '', fullName: 'Dayanna Fernández' })],
    });
    expect(roll.rows[1].student.uid).toBe('d');
    expect(roll.rows[1].matchedBy).toBe('nombre-parcial');
  });

  it('no adivina cuando el nombre corto encaja con dos de la lista', () => {
    const dosJuanPablo = [
      { codigo: 'A00407215', nombre: 'JUAN PABLO MARTINEZ ROSERO' },
      { codigo: 'A00405570', nombre: 'JUAN PABLO PINO BASTIDAS' },
    ];
    const roll = matchRoster({
      roster: dosJuanPablo,
      students: [student({ uid: 'jp', codigo: 'XXXX', fullName: 'Juan Pablo' })],
    });
    expect(roll.stats.registrados).toBe(0);
    expect(roll.extras.map((s) => s.uid)).toEqual(['jp']);
  });

  it('tampoco adivina cuando dos perfiles compiten por la misma fila', () => {
    const roll = matchRoster({
      roster,
      students: [
        student({ uid: 'a', codigo: '', fullName: 'Xilena Vidal' }),
        student({ uid: 'b', codigo: '', fullName: 'Xilena Ramirez' }),
      ],
    });
    expect(roll.rows[2].registered).toBe(false);
    expect(roll.extras.map((s) => s.uid)).toEqual(['a', 'b']);
  });

  it('un solo apellido no basta: se necesitan dos tokens en común', () => {
    const roll = matchRoster({
      roster,
      students: [student({ uid: 'v', codigo: '', fullName: 'Vidal' })],
    });
    expect(roll.rows[2].registered).toBe(false);
  });

  it('el código exacto de otra fila gana sobre el parecido', () => {
    const roll = matchRoster({
      roster,
      students: [
        student({ uid: 'exacto', codigo: 'A00404256', fullName: 'Quien Sea' }),
        student({ uid: 'typo', codigo: 'A0040256', fullName: 'Xilena Vidal' }),
      ],
    });
    expect(roll.rows[2].student.uid).toBe('exacto');
    expect(roll.rows[2].matchedBy).toBe('codigo');
    expect(roll.extras.map((s) => s.uid)).toEqual(['typo']);
  });
});
