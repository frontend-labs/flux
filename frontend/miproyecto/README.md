# flux

> un futuro framework frontend

### Install Gulp globally:

```
sudo npm install -g gulp
```

### Install Bower globally:

```
sudo npm install -g bower
```

## Carpeta de trabajo Frontend.

Absolutamente todas la fuentes del desarrollo Frontend deberían agregarse/modificarse en la carpeta frontend.

### Ingresamos a la siguiente ruta

```
cd frontend/miproyecto
```

### Instalamos nuestra configuración local

```
bash .local.sh
```

### Instalando todas las dependencias locales de nuestro proyecto

```
npm install -d
```

### Instalando todas las librerias de las que depende el proyecto

```
bower install
```

### Limpiando el proyecto

```
gulp clean
```

### Ejecutando todas las tareas

```
gulp
```

### Solo Javascript

```
gulp js
```

### Watcher de Gulp

```
gulp watch
```

### Generar css sprites

```
gulp images
```

### Levantar un servidor local con nodejs

Para levantar el servidor solo tienes que escribir lo siguiente,
si esta sentencia se cierra el servidor no funcionará¡.

```
gulp server
```

Para acceder a este servidor local el dominio será:

```
localhost:3000
```

## Bugs

Solucionando bugs de OS

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Instalando las dependencias.

### Instalando libcairo2:

```
sudo apt-get install libcairo2-dev
```

### Instalando libjpeg:

```
sudo apt-get install libjpeg-dev
```

### Instalando libgif:

```
sudo apt-get install libgif-dev
```