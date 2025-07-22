const modules = import.meta.glob('@/content/*.md', { query: '?raw', import: 'default', eager: true });

const lessonRawContents = {};

for (const path in modules) {
  const fileName = path.split('/').pop();
  lessonRawContents[fileName] = modules[path];
}

console.log('Imported lesson raw contents:', lessonRawContents);

export default lessonRawContents;