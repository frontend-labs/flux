Flux 
===================

> Construyendo un futuro framework frontend

Instalando las dependencias.
-------------------
### Install Gulp globally:

```
sudo npm install -g gulp
```

### Install Bower globally:

```
sudo npm install -g bower
```

Carpeta de trabajo Frontend.
-------------------
Absolutamente todas la fuentes del desarrollo Frontend deberían agregarse/modificarse en la carpeta frontend.

### Ingresamos a la siguiente ruta
```
cd frontend/
```

Instalando todas las dependencias locales de nuestro proyecto
-------------------
En consola escribir lo siguiente:
```
npm install
```
Si pide permisos ejecutar con **sudo**

#### Ejecutar todas las tareas
```
gulp
```
#### Ejecutar watchers
```
gulp watch
```
Al ejecutar esta tarea, automáticamente se abrirá una página lista para poder trabajar, donde por defecto se muestra el logo de frontendLabs.
> **Nota:**
> - El servidor se ha realizado con Express.js
> - Por defecto la ruta es: http://localhost:3000/

Ejecutando tareas específicas
-------------------
#### Compilar javascript
```
gulp js
```
#### Compilar estilos
```
gulp styles
```
#### Generar imágenes sprites
```
gulp sprite
```
#### Generar fuentes
```
gulp fonts
```
#### Generar fuente de iconos
```
gulp icons
```
