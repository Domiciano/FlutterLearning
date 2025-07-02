import fs from 'fs';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

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

// Extrae todos los bloques [c:dart] ... [end]
const codeBlocks = [];
const regex = /\[c:dart\]([\s\S]*?)\[end\]/g;
let match;
while ((match = regex.exec(markdown)) !== null) {
  codeBlocks.push(match[1].trim());
}

if (codeBlocks.length === 0) {
  console.log('No se encontraron bloques [c:dart] en el archivo.');
  process.exit(0);
}

async function uploadGist(code, index) {
  const filename = `${uuidv4()}.dart`;
  const body = {
    description: `Snippet Dart extraído de ${markdownFile} (bloque ${index + 1})`,
    public: true,
    files: {
      [filename]: {
        content: code
      }
    }
  };

  const res = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al crear gist: ${error}`);
  }

  const data = await res.json();
  return data.html_url;
}

(async () => {
  for (let i = 0; i < codeBlocks.length; i++) {
    try {
      const url = await uploadGist(codeBlocks[i], i);
      console.log(`Gist creado para bloque ${i + 1}: ${url}`);
    } catch (err) {
      console.error(`Error en bloque ${i + 1}:`, err.message);
    }
  }
})(); 