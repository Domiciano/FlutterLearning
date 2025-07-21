import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

if (process.argv.length < 3) {
  console.error('Uso: node upload-gists.js <archivo-markdown>');
  process.exit(1);
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error('Debes definir la variable de entorno GITHUB_TOKEN con un token de GitHub válido (scope gist)');
  process.exit(1);
}

const markdownFile = process.argv[2];
const markdown = fs.readFileSync(markdownFile, 'utf8');
const baseName = path.basename(markdownFile, path.extname(markdownFile));

// Extrae todos los bloques [code:dart] ... [endcode]
const codeBlocks = [];
const regex = /\[code:dart\]([\s\S]*?)\[endcode\]/g;
let match;
while ((match = regex.exec(markdown)) !== null) {
  codeBlocks.push(match[1].trim());
}

// Log de depuración: cantidad y contenido de bloques encontrados
console.log('Bloques [code:dart] encontrados:', codeBlocks.length);
codeBlocks.forEach((block, idx) => {
  console.log(`--- Bloque ${idx + 1} ---\n${block}\n--- Fin bloque ${idx + 1} ---`);
});

// Contar [endcode] en el archivo
const endcodeCount = (markdown.match(/\[endcode\]/g) || []).length;
console.log('Cantidad de [endcode] en el archivo:', endcodeCount);

if (codeBlocks.length === 0) {
  console.log('No se encontraron bloques [code:dart] en el archivo.');
  process.exit(0);
}

async function getAllGists() {
  let page = 1;
  let gists = [];
  while (true) {
    const res = await fetch(`https://api.github.com/gists?per_page=100&page=${page}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
      }
    });
    if (!res.ok) throw new Error('No se pudieron obtener los gists');
    const data = await res.json();
    gists = gists.concat(data);
    if (data.length < 100) break;
    page++;
  }
  return gists;
}

async function findGistByFilename(filename, gists) {
  for (const gist of gists) {
    if (gist.files && gist.files[filename]) {
      return gist;
    }
  }
  return null;
}

async function createOrUpdateGist(filename, code, description, gists) {
  const existingGist = await findGistByFilename(filename, gists);
  if (existingGist) {
    // Actualizar gist existente
    const res = await fetch(`https://api.github.com/gists/${existingGist.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description,
        files: {
          [filename]: { content: code }
        },
        public: true
      })
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Error al actualizar gist: ${error}`);
    }
    const data = await res.json();
    return { url: data.html_url, id: data.id };
  } else {
    // Crear nuevo gist
    const res = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description,
        public: true,
        files: {
          [filename]: { content: code }
        }
      })
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Error al crear gist: ${error}`);
    }
    const data = await res.json();
    return { url: data.html_url, id: data.id };
  }
}

(async () => {
  const gists = await getAllGists();
  const gistIds = [];
  for (let i = 0; i < codeBlocks.length; i++) {
    const filename = `${baseName}code${i + 1}.dart`;
    const description = `Snippet Dart extraído de ${markdownFile} (${filename})`;
    try {
      const result = await createOrUpdateGist(filename, codeBlocks[i], description, gists);
      gistIds.push(result.id);
      console.log(`Gist para bloque ${i + 1} (${filename}): ${result.url}`);
    } catch (err) {
      gistIds.push(null);
      console.error(`Error en bloque ${i + 1} (${filename}):`, err.message);
    }
  }

  // Ahora, modificar el markdown para insertar/reemplazar [trycode] <id> después de cada [end]
  const lines = markdown.split(/\r?\n/);
  let blockIndex = 0;
  let i = 0;
  const newLines = [];
  while (i < lines.length) {
    newLines.push(lines[i]);
    if (lines[i].trim() === '[endcode]' && blockIndex < gistIds.length) {
      // Si la siguiente línea es [trycode] ... o [dartpad] ... la reemplazamos
      if (lines[i + 1] && (lines[i + 1].trim().startsWith('[trycode]') || lines[i + 1].trim().startsWith('[dartpad]'))) {
        newLines.push(`[trycode] ${gistIds[blockIndex]}`);
        i += 2; // saltar la línea existente
      } else {
        newLines.push(`[trycode] ${gistIds[blockIndex]}`);
        i++;
      }
      blockIndex++;
    } else {
      i++;
    }
  }
  // Si el último bloque termina justo en [endcode] y no se insertó el último [trycode]
  if (blockIndex < gistIds.length) {
    newLines.push(`[trycode] ${gistIds[blockIndex]}`);
  }
  fs.writeFileSync(markdownFile, newLines.join('\n'), 'utf8');
  console.log('Archivo markdown actualizado con los IDs de gist usando [trycode].');
})(); 