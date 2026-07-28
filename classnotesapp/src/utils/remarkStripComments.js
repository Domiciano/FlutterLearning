// Quita los comentarios HTML del árbol antes de renderizar.
//
// Hace falta porque react-markdown (v10) no los descarta: al no haber
// `rehype-raw`, el HTML crudo no se interpreta pero tampoco se tira — se
// **escapa** y acaba en la página como texto literal. Para un comentario eso
// es lo peor de las dos opciones: se ve `<!-- tags: … -->` en mitad de la
// lección, justo encima del primer párrafo.
//
// Importa porque las etiquetas de tema (`ai/lessonTags.js`) se declaran
// exactamente así, en un comentario bajo el `#`. Se leen del markdown en crudo,
// que llega intacto tanto al asistente como a `extractLessonTags`; este plugin
// solo toca lo que se muestra.
//
// Solo se eliminan los nodos que son **únicamente** un comentario. Cualquier
// otro HTML crudo se deja como está: seguirá viéndose escapado, que es el
// comportamiento actual, y este arreglo no es el sitio para cambiarlo.
const COMMENT_ONLY = /^\s*<!--[\s\S]*?-->\s*$/;

const isComment = (node) => node.type === 'html' && COMMENT_ONLY.test(node.value ?? '');

export default function remarkStripComments() {
  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.filter((child) => !isComment(child));
      node.children.forEach(walk);
    };
    walk(tree);
  };
}
