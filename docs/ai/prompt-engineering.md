# Prompt Engineering

En este documento recojo técnicas y ejemplos de prompt engineering aplicados al desarrollo. Documentaré qué prompts han funcionado mejor.

---

## 1. Rol de desarrollador senior
**Prompt:**
> Actúa como un desarrollador senior de JavaScript. Revisa esta función y sugiere mejoras de rendimiento y legibilidad: [código]

**Por qué funciona:** Definir un rol hace que la IA adopte un nivel de expertise específico y responda con mayor profundidad técnica.

---

## 2. Few-shot para nombrar variables
**Prompt:**
> Renombra estas variables siguiendo buenas prácticas. Ejemplos: `x` → `contador`, `arr` → `listaTareas`, `fn` → `calcularTotal`. Ahora renombra: `tmp`, `data`, `cb`

**Por qué funciona:** Los ejemplos previos guían a la IA hacia el estilo y formato exacto que esperas.

---

## 3. Razonamiento paso a paso
**Prompt:**
> Explica paso a paso qué hace esta función antes de sugerir cualquier cambio: [código]

**Por qué funciona:** Pedir razonamiento previo reduce errores porque la IA entiende el código antes de modificarlo.

---

## 4. Restricciones claras
**Prompt:**
> Refactoriza esta función. Restricciones: no uses arrow functions, mantén compatibilidad con ES5, máximo 10 líneas: [código]

**Por qué funciona:** Las restricciones evitan respuestas genéricas y fuerzan a la IA a trabajar dentro de tus requisitos.

---

## 5. Generar JSDoc
**Prompt:**
> Actúa como un desarrollador técnico. Añade comentarios JSDoc completos a estas funciones incluyendo @param, @returns y un ejemplo de uso: [código]

**Por qué funciona:** Combinar rol con tarea específica produce documentación más precisa y completa.

---

## 6. Detectar bugs
**Prompt:**
> Analiza este código como si fuera una revisión de código en producción. Lista todos los posibles bugs, casos límite y mejoras de seguridad: [código]

**Por qué funciona:** Enmarcar la tarea como "revisión de producción" activa un nivel de análisis más crítico.

---

## 7. Refactorizar con explicación
**Prompt:**
> Refactoriza esta función y explica cada cambio que hagas y por qué lo mejora: [código]

**Por qué funciona:** Pedir explicaciones obliga a la IA a justificar sus decisiones, lo que ayuda a aprender y evaluar si el cambio es correcto.

---

## 8. Generar casos de prueba
**Prompt:**
> Actúa como un QA engineer. Genera 5 casos de prueba manuales para esta funcionalidad, incluyendo casos límite y casos de error: [funcionalidad]

**Por qué funciona:** El rol de QA orienta la respuesta hacia pruebas exhaustivas en lugar de solo casos felices.

---

## 9. Mejorar accesibilidad
**Prompt:**
> Revisa este HTML y sugiere mejoras de accesibilidad siguiendo las pautas WCAG 2.1. Explica cada cambio: [código]

**Por qué funciona:** Citar un estándar concreto (WCAG 2.1) hace que la IA use criterios reales en lugar de sugerencias genéricas.

---

## 10. Documentar decisiones técnicas
**Prompt:**
> Actúa como un desarrollador que escribe documentación técnica. Explica en máximo 3 párrafos por qué se tomaron estas decisiones de arquitectura en el proyecto: [descripción]

**Por qué funciona:** Limitar la longitud y definir el rol produce documentación concisa y profesional.