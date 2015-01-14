# Creación de módulo en coffee

Un módulo en coffee se divide de la siguiente manera:

**Descripción del módulo**
- En el primer parrafo se describe la funcionalidad del módulo.
- **@class:** Nombre del módulo a crear.
- **@main:** modulo/controlador/vista, esto nos ayuda a ubicar nuestro módulo en el proyecto.
- **@autor:** Nombre y apellido de quien hizo el módulo.

``` coffee
###
Módulo para obtener el texto de un listado
@class get_text_list
@main default/cuenta/index
@author Jhonnatan Castro
###
```



**Cuerpo del módulo**
- Un módulo se declara de esta forma, añadiendolo al **AppCore** del **yOSON**.
- Aqui es cuando se define su nombre, en este caso **"get_text_list"**, el nombre del módulo debe ir en minusculas, si el nombre es compuesto debe ir separado por **"_"**.
- También recibe como parametro **"Sb"** o sandbox, con este objeto se comunican los módulos.
- En la parte final del módulo en los **"[ ]"**, se añaden los plugins a usar en el módulo

``` coffee
yOSON.AppCore.addModule "get_text_list", (Sb) ->
,["js/dist/libs/jquery.example1.js", "js/dist/libs/jquery.example2.js" ]
```



**Datos de configuración del módulo**
- Dentro del objeto defaults se definen las variables de configuración del módulo.
- Se debe tener un objeto DOM que sea padre de los elementos que vamos a acceder. 
  De esta forma no buscamos nuestro elemento **"li a"** en todo el DOM, sino en su padre.

``` coffee
  defaults = 
		parent : '.list_locations'
		el     : 'li a'
```



- Nuestro HTML, seria de esta manera:

``` html
<ul class=".list_locations">
  <li><a href="#">Perú</a></li>
  <li><a href="#">Argentina</a></li>
</ul>
```

**Cacheo de elementos DOM**
- Con el metodo **catchDom**, guardamos los objetos jquery en la dom.


``` coffee
###
Módulo para obtener el texto de un listado
@class get_text_list
@main default/cuenta/index
@author Jhonnatan Castro
###
 
yOSON.AppCore.addModule "get_text_list", (Sb) ->
	dom = {}
  defaults = 
		parent : '.list_locations'
		el     : 'li a'
 
  catchDom = () ->
    dom.parent = $(defaults.parent)
    dom.el     = $(defaults.el, dom.parent)
    return
```
**Listener para los elementos DOM**
- Con el método **suscribeEvents** se añaden eventos o listener a nuestros elementos dom.



``` coffee
###
Módulo para obtener el texto de un listado
@class get_text_list
@main default/cuenta/index
@author Jhonnatan Castro
###
 
yOSON.AppCore.addModule "get_text_list", (Sb) ->
	dom = {}
  defaults = 
		parent : '.list_locations'
		el     : 'li a'
 
  catchDom = () ->
    dom.parent = $(defaults.parent)
    dom.el     = $(defaults.el, dom.parent)
    return
    
  suscribeEvents = () ->
		dom.el.on 'click', events.getText
		dom.el.on 'mouseup', events.getText
		return  
```

**Objeto "events" donde estan todas nuestras funciones tipo listener**
- En nuestro caso tenemos al metodo **getText**

**Objeto "fn" donde estan todas las funciones de nuestro módulo**
- Aquí tenemos a la función **captureText**

**La función "initialize" nos permite ejecutar todo nuestro modulo**
- Dentro de esta funcion tenemos a "$.extend", que es un metodo que nos permite setear nuestras configuraciones a nuestro módulo.
- Aquí ejecutamos el metodo "catchDom" y "suscribeEvents" en ese orden.

**Y el objeto "return" retorna el metodo inicializar del módulo**



``` coffee
###
Módulo para obtener el texto de un listado
@class get_text_list
@main default/cuenta/index
@author Jhonnatan Castro
###
 
yOSON.AppCore.addModule "get_text_list", (Sb) ->
	dom = {}
  defaults = 
		parent : '.list_locations'
		el     : 'li a'
 
  catchDom = (defaults) ->
    dom.parent = $(defaults.parent)
    dom.el     = $(defaults.el, dom.parent)
    return
    
  suscribeEvents = () ->
		dom.el.on 'click', events.getText
		return  
	
	events = 
		getText: (e) ->
		  ele = $(e.target)
			fn.captureText(ele)
			return
	
	fn = 
	  captureText : (ele)->
	    ele.text()
	    
	initialize = (opts) ->
		$.extend defaults, opts
		catchDom(defaults)
		suscribeEvents()
		return
 
	return {
		init: initialize
	}
 
,[]
	
```

> Todos los módulos que han sido creados se tienen que agregar a modules.coffee
> Aquí es donde se enviamos nuestras configuraciones a nuestro módulo, mediante parametros.
> El archivo modules.coffee lo encontramos en : coffee/libs/yosonjs-utils/modules.coffee

> - Dentro del archivos modules.coffee tenemos un objeto yOSON.AppSchema.modules.
> - Es un objeto donde se configura toda la funcionalidad del sitio, de acuerdo al modulo, controlador y vista.
> - La ubicación lo podremos encontrar facilmente en la parte @main de la descripción de nuestro módulo.
> - En nuestro caso seria : default/cuenta/index

``` coffee
yOSON.AppSchema.modules =
	"default":
		"controllers":
			"cuenta":				
				"allActions": ()->
					return
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "get_text_list", {parent: ".list_locations", el: "li a"} 
						return
					"byDefault": () ->
						return
			"byDefault": () ->
				return
		"byDefault": () ->
				return		
		"allControllers": () ->
			return
	"byDefault": () ->
		return
```		

  
