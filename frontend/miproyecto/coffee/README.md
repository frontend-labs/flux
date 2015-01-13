# Cómo organizar nuestros módulos coffee

Dentro de este lugar encontramos 2 carpetas libs y scripts.

### Carpeta libs:

Aquí van todos los plugins que creamos para nuestro proyecto en coffee por ejemplo: 
 - attrchange.coffee
 - pretty-select.coffee
 
También va estar la carpeta yoson-utils, que son los helpers del yoson.

### Carpeta scripts:

Aquí van todos los módulos que crearemos para nuestro proyecto, organizados de la siguiente manera: 
 - all
 - desktop
 - mobile, etc
 
Tener en cuenta que dentro de all, van todos los módulos que van a ser utilizados en todo nuestro proyecto,
de tal forma que el modulo que creamos, debe tener funcionalidad única y debe ser customizable, de esa manera garantizamos
su uso eficiente.

Como su mismo nombre lo dice, dentro de desktop, mobile y demás carpetas que se añadieran, iría funcionalidad única para cada ámbito.
