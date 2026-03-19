# Experimentos con IA

En este documento registro los experimentos realizados con herramientas de IA durante el desarrollo de TaskFlow. Incluiré el objetivo, el proceso y el resultado de cada experimento.

## Problemas generales de programación

### Problema 1: Invertir una cadena de texto

**Sin IA:**
Usé un bucle for recorriendo el string al revés.
```js
function invertirCadena(str) {
  let resultado = '';
  for (let i = str.length - 1; i >= 0; i--) {
    resultado += str[i];
  }
  return resultado;
}
```
**Con IA:**
En 30 segundos obtuve una solución más limpia usando métodos nativos.
```js
const invertirCadena = str => str.split('').reverse().join('');
```
**Conclusión:** La IA fue más rápida y el código más legible. Sin embargo, entendí mejor el problema haciéndolo manualmente primero.

---

### Problema 2: Eliminar duplicados de un array

**Sin IA:**
Usé un bucle y un array auxiliar.
```js
function eliminarDuplicados(arr) {
  let resultado = [];
  arr.forEach(function(item) {
    if (!resultado.includes(item)) {
      resultado.push(item);
    }
  });
  return resultado;
}
```
**Con IA:**
La IA propuso usar Set en segundos.
```js
const eliminarDuplicados = arr => [...new Set(arr)];
```
**Conclusión:** La IA conoce patrones modernos que yo no tenía en mente. Útil para aprender nuevas formas de resolver problemas.

---

### Problema 3: Ordenar tareas por nombre

**Sin IA:**
Tuve que mirar paso a paso para saber como hacerlo.
```js
function ordenarPorNombre(tareas) {
  return tareas.sort(function(a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
}
```
**Con IA:**
La IA lo resolvió en segundos con localeCompare.
```js
const ordenarPorNombre = tareas => tareas.sort((a, b) => a.title.localeCompare(b.title));
```
**Conclusión:** localeCompare maneja correctamente caracteres especiales como tildes, algo que yo no había considerado.

---

## Experimentos en el proyecto TaskFlow

### Tarea 1: Añadir validación de tarea duplicada

**Sin IA:**
Tardé 30 minutos pensando cómo comparar el texto de las tareas existentes antes de añadir una nueva y modificando la lógica del formulario.

**Con IA:**
En 5 minutos la IA propuso una solución completa con la validación integrada en el submit y un mensaje de aviso al usuario.

**Conclusión:** Para funcionalidades nuevas que afectan a varios archivos, la IA ahorra mucho tiempo.

---

### Tarea 2: Refactorizar renderizarTareas

**Sin IA:**
Intenté simplificar la función pero no sabía bien por dónde empezar. Tardé 25 minutos con resultados mediocres.

**Con IA:**
La IA detectó código repetido y lo extrajo en funciones más pequeñas en menos de 2 minutos.

**Conclusión:** La IA es especialmente útil para refactorizar código propio porque ve patrones que uno no ve.

---

### Tarea 3: Añadir comentarios JSDoc

**Sin IA:**
Tardé 20 minutos escribiendo los comentarios uno a uno buscando la sintaxis correcta.

**Con IA:**
La IA generó todos los comentarios JSDoc en menos de 1 minuto con el formato correcto.

**Conclusión:** Para tareas repetitivas y mecánicas, la IA es muy superior en velocidad.

---

## Conclusión general

La IA es más útil cuando el problema es conocido y bien definido. Para aprender y entender un concepto nuevo, resolverlo primero sin IA es más efectivo. La combinación ideal es intentarlo solo primero y luego usar la IA para mejorar o validar la solución.