# Prueba de Experiencia (FullStack)
Esta prueba fue ideada para medir el nivel de conocimientos y experiencia tanto en sintaxis como de las distintas API's de `javascript`.

> **¡IMPORTANTE!**
>
> Esta es una prueba FullStack, por tanto **NO** es necesario añadir diseño(colores, temas, fuentes, etc)


## Puntos a Valorar
* Implementación adecuada de `let`, `const`, `var`.
* Implementación de `class`.
* Implementación de `constructor`.
* Implementación de `() =>`.
* Implementación de interpolación de `string`.
* Implementación de concepto `destructuring`.
* Implementación de valores por defecto.
* Implementación de modulos
* Implementación de `reduce`, `map`, `filter`, `find`, `findIndex`, `flat`, `flatMap`, `some`.
* Implementación de `Promise`
* Implementación de `async` y `await`.
* Uso correcto de herramienta git.
* Uso correcto de base de datos.
* Implementación adecuada de `Express`.


## Recomendaciones
* Utilizar 2 espacios como tabulación.
* Archivos en `utf8` sin `BOM`
* Una clase, un archivo.
* Nombre de clases en UpperCamelCase
* Nombre de metodos en camelCase
* Puedes importar cualquier librería que pueda ser de ayuda para tu solución (`moment`, `lodash`, etc).
* Puedes usar cualquier manejador de paquetes como `npm`, `yarn`, `bower`, etc.
* No hay restricción de IDE.
* No se requiere diseño o estilos.


## Para comenzar
Deberas solicitar acceso al proyecto mediente el siguiente [enlace](https://gitlab.com/olaferlandsen/prueba-seleccion/project_members/request_access), una vez solicitado el acceso, se te concederan **24h** para realizar un fork y enviar un pull-request con las soluciones a los problemas planteados.
```sh
git clone https://gitlab.com/olaferlandsen/prueba-seleccion.git
```

## Desafío

### Capacidades Backend
> **¡IMPORTANTE!**
>
> Deberas realizar esta prueba en el directorio `backend/` de este repositorio.
> En caso de que la API [Game of Thrones Show](https://api.got.show/doc/) no este funcionando, podras usar la API de [An API of Ice and Fire](https://anapioficeandfire.com/)

Se debera implementar una aplicación con `Express`, la cual debera contener un servicio que conecte, extraiga y almacene los personajes desde de la API [Game of Thrones Show](https://api.got.show/doc/), par esto deberas utilizar alguna de las siguinetes bases de dato:
* `SQLite`
* `Cassandra`
* `MongoDB`
* `SQL Server`
* `MySQL`
* `MariaDB`
* `Postgres`
* `Oracle`
* `DynamoDB`
* `Firebase`

Una vez almacenados los personajes, se deberan implementar dos endpoints para acceso publico:

| Metodo | Endpoint        | Descripción                                                   |
|--------|-----------------|---------------------------------------------------------------|
| GET    | /characters/:id | Obtiene la información del personaje determinado por su `id`  |
| GET    | /characters     | Obtiene una lista de personjes, la cual permite la paginación |


### Capacidades en frontend
> **¡IMPORTANTE!**
>
> Deberas realizar esta prueba en el directorio `frontend/` de este repositorio.

Deberás crear un proyecto a partir de cero en `React`, `Angular`, `React Native`, `Ionic` o `Vue`, con el cual deberás consumir las API creadas con `Express`.
Una vez implementado el proyecto front, se debera proceder a crear dos vistas:
 
| Vista | Descripción                                                                                                                                                                       |
|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| List  | Aca se debera listar todos los personajes con un servicio de paginación, limitando a 10 personajes por pagina e implementado un buscador de texto para filtrar por nombre o casa. |
| View  | Aca debe mostrarse la información referente al persoje objetivo, incluyendo su imagen(si es que tiene), sexo, slug, rank, casa, libros y titulos                                  |



Suerte y mucho exito!
====
Estaremos muy contentos con tu respuesta 💪

