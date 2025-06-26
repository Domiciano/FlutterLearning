// Lesson3.jsx
import React from "react";
import LessonTitle from "../components/LessonTittle";
import LessonParagraph from "../components/LessonParagraph";
import CodeBlock from "../components/CodeBlock";
import LessonContainer from "../components/LessonContainer";
import LessonSubTitle from "../components/LessonSubTitle";

const Lesson3 = () => {
  return (
    <LessonContainer>
      <LessonTitle>Control de Flujo en Dart</LessonTitle>

      <LessonParagraph>
        El control de flujo permite dirigir la ejecución del código según condiciones específicas. Dart ofrece varias estructuras para ello.
      </LessonParagraph>

      <LessonSubTitle>1. Condicional <code>if</code> / <code>else</code></LessonSubTitle>
      <LessonParagraph>
        Permite ejecutar diferentes bloques de código dependiendo de si una condición es verdadera o falsa.
      </LessonParagraph>
      <CodeBlock language="dart">
        {`
int edad = 20;

if (edad >= 18) {
  print("Eres mayor de edad");
} else {
  print("Eres menor de edad");
}
        `}
      </CodeBlock>

      <LessonSubTitle>2. Estructura <code>switch</code></LessonSubTitle>
      <LessonParagraph>
        Es útil cuando se necesita comparar una variable contra varios valores posibles.
      </LessonParagraph>
      <CodeBlock language="dart">
        {`
String dia = 'Lunes';

switch (dia) {
  case 'Lunes':
    print("Inicio de semana");
    break;
  case 'Viernes':
    print("Fin de semana se acerca");
    break;
  default:
    print("Día normal");
}
        `}
      </CodeBlock>

      <LessonSubTitle>3. Ciclo <code>for</code></LessonSubTitle>
      <LessonParagraph>
        Se usa para repetir un bloque de código un número determinado de veces.
      </LessonParagraph>
      <CodeBlock language="dart">
        {`
for (int i = 0; i < 5; i++) {
  print("Iteración \$i");
}
        `}
      </CodeBlock>

      <LessonSubTitle>4. Ciclo <code>while</code> y <code>do-while</code></LessonSubTitle>
      <LessonParagraph>
        Ejecutan un bloque de código mientras una condición sea verdadera.
      </LessonParagraph>
      <CodeBlock language="dart">
        {`
// while
int contador = 0;
while (contador < 3) {
  print("Contador: \$contador");
  contador++;
}

// do-while
int num = 0;
do {
  print("Número: \$num");
  num++;
} while (num < 3);
        `}
      </CodeBlock>
    </LessonContainer>
  );
};

export default Lesson3;
