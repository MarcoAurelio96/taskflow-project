# Backend API Tools

Este documento resume herramientas frecuentes del ecosistema backend/API y por que se utilizan en proyectos reales.

## Axios

Axios es un cliente HTTP para JavaScript (navegador y Node.js) que simplifica llamadas REST.

Por que se usa:

- API ergonomica para `GET`, `POST`, `PUT`, `DELETE`.
- Interceptores para logging, autenticacion y refresh de tokens.
- Transformacion automatica de JSON.
- Manejo de errores centralizado por status code.

Cuando elegirlo:

- Si necesitas capa HTTP con politicas transversales (headers globales, retry, interceptores).
- Si quieres una abstraccion mas robusta que `fetch` nativo.

## Postman

Postman es una plataforma para diseñar, probar y documentar APIs.

Por que se usa:

- Permite ejecutar requests manuales y automatizadas.
- Gestiona colecciones y entornos (dev/staging/prod).
- Facilita pruebas de regresion con assertions.
- Sirve para compartir contratos API con el equipo.

Casos tipicos:

- Validar rapidamente endpoints durante desarrollo.
- Ejecutar smoke tests sin escribir codigo de cliente.

## Sentry

Sentry es una plataforma de observabilidad enfocada en errores y performance.

Por que se usa:

- Captura excepciones en tiempo real en frontend y backend.
- Agrupa errores repetidos y muestra stack traces.
- Añade contexto (usuario, release, request metadata).
- Dispara alertas para reaccionar antes de afectar a muchos usuarios.

Casos tipicos:

- Monitorear APIs en produccion.
- Detectar regresiones tras despliegues.

## Swagger (OpenAPI)

Swagger suele referirse al ecosistema de OpenAPI para documentar y explorar APIs.

Por que se usa:

- Define el contrato de la API de forma estandar.
- Genera documentacion interactiva (Swagger UI).
- Reduce ambiguedad entre frontend, backend y QA.
- Permite generar clientes SDK y validaciones automáticas.

Casos tipicos:

- Proyectos con varios consumidores de API.
- Equipos que necesitan versionado y gobernanza de contratos.

## Resumen rapido

- Axios: cliente HTTP para consumir APIs.
- Postman: testing y exploracion manual/automatizada de endpoints.
- Sentry: monitoreo de errores y trazabilidad en produccion.
- Swagger/OpenAPI: contrato y documentacion formal de la API.
