# Flux

Flux is a set of tasks developed with Gulp to make your front-end workflow easier. These tasks involve the compilation of files written with Jade, Stylus and Coffeescript pre-processors integrated with different node packages in an organized folder structure.

## Main tasks

Task | Description
---------------- | ---
**gulp clean**   | Task to delete js, css, font and image files previously compiled.
**gulp copy**    | Task to copy fonts and images from the `flux/frontend/` folder
**gulp css**     | Task to compile `*.styl` files to `*.css`.
**gulp html**    | Task to compile `*.jade` files to `*.html`.
**gulp js**      | Task to compile `*.coffee` files to `*.js`.
**gulp sprites** | Task to generate a spritesheet from `*.png` image files.
**gulp fonts**   | Task to generate a css stylesheet from font files (`*.eot`, `*.ttf`,  `*.woff`, `*.svg`).
**gulp icons**   | Tast to generate an icon font from `*.svg` images.
**gulp watch**   | Task to listen for any changes made in the `*.coffee`, `*.styl`, `*.jade` files and compile them automatically.
**gulp bower**   | Task to manage plugins installed with Bower.

## Installation

### Installing dependencies

#### Install npm and nodejs in linux
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

#### Install gulp globally
```
sudo npm install -g gulp
```

#### Install bower globally
```
sudo npm install -g bower
```

#### Working folder

All the front-end source files have to be added/modified in the `frontend/` folder.

```
cd frontend/
```

### Installing all the local dependencies for our project
Once you are in the `frontend/` folder install all the dependencies located in the **package.json** file. 
```
npm install
```
> **Note:**
> If you need permissions add **sudo** at the beginning.

#### Run all the tasks
This command in the console will execute all the default tasks contained in the **gulpfile.js** file. 
```
gulp
```
> **Note:**
> You can also run gulp [name-of-the-task] individually.

#### Install libraries with bower
```
bower install
```
#### Run watchers
```
gulp watch
```
This task will automatically open a browser window with the default welcome page where you can see the [frontendlabs](http://frontendlabs.io) logo.
> **Note:**
> - We're using a server made with Express.js
> - The default route is: http://localhost:3000/
> - You can configure the url by editing the **server.js** file, which is located in `/frontend/config/server.js`

> You can also access any project route. By default you can find a blank page in the following route `http://localhost:3000/postulante/home/index`

## Documentation

- [Documentación en español](README-es.md)

