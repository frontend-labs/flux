# Flux
**Haciendo el flujo de trabajo frontend más facil**


## ¿Qué es Flux?

Flux es un conjunto de tareas desarrolladas con gulp para facilitar el flujo de trabajo FrontEnd. Estas tareas involucran a los precompiladores como jade, stylus y coffescript, integrados con distintos paquetes de node y  a una estructura de carpetas para mantener el orden.

## Tareas Principales

<a name="todas_las_tareas"></a>Tarea | Descripción
---------------- | ---
**gulp clean**   | Tarea para eliminar js, css, fuentes e imagenes previmanete compilados.
**gulp copy**    | Tarea para copiar fuentes e imagenes desde la carpeta base frontend.
**gulp css** 	 | Tarea para compilar css a partir de archivos stylus.
**gulp html**    | Tarea para compilar html a partir archivos jade.
**gulp js**      | Tarea para compilar javascript a partir de archivos coffee.
**gulp sprites** | Tarea para compilar archivos *.png a una imagen de sprites.
**gulp fonts**   | Tarea para generar css a partir de archivos de fuentes (eot, ttf, woff, svg).
**gulp icons**   | Tarea para generar fuente de iconos a partir de iconos en svg.
**gulp watch**   | Tarea para escuchar cualquier modificación que se en los archivos coffee, stylus, jade y compilarlos automáticamente.
**gulp bower** 	 | Tarea para manipular plugins instalados por bower.

## Instalación

### <i class="icon-hdd"></i> Instalando las dependencias.

#### <i class="icon-cog"></i> Instalar npm y nodejs en linux
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

#### <i class="icon-cog"></i> Instalar gulp de forma global
```
sudo npm install -g gulp
```

#### <i class="icon-cog"></i>  Instalar bower de forma global
```
sudo npm install -g bower
```

#### <i class="icon-folder-open"></i> Ingresamos a la carpeta Frontend.

Absolutamente todas la fuentes del desarrollo Frontend deberían agregarse/modificarse en la carpeta frontend.

```
cd frontend/
```

###<i class="icon-hdd"></i> Instalando todas las dependencias locales de nuestro proyecto
Una vez situado en la carpeta frontend, debemos instalar todas las dependencias que se encuentran en el archivo <i class="icon-file"></i> **package.json**. 
```
npm install
```
> **Nota:**
> Si pide permisos ejecutar con **sudo**

#### <i class="icon-cog"></i> Ejecutar todas las tareas
Utilizando este comando en la consola ejecutará el archivo <i class="icon-file"></i> **gulpfile.js**. 
```
gulp
```
> **Nota:**
> También se puede ejecutar las [tareas](#todas_las_tareas) en forma independiente

#### <i class="icon-cog"></i> Instalar librerías con bower
```
bower install
```
#### <i class="icon-cog"></i> Ejecutar watchers
```
gulp watch
```
Al ejecutar esta tarea, automáticamente se abrirá una página por defecto de bienvenida, donde se muestra el logo de frontendLabs.
> **Nota:**
> - El servidor con cual se trabaja se ha realizado con Express.js
> - Por defecto la ruta es: http://localhost:3000/
> - Se puede configurar las url editando el archivo <i class="icon-file"></i> **server.js**, ubicado en la ruta `/frontend/config/server.js`

> También se puede acceder a cualquier ruta del proyecto y por defecto se ha establecido una pagina en blanco mediante la ruta: 
> http://localhost:3000/postulante/home/index