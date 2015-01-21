###
yosonjs - Utils
@class utils
@main yosonjs/utils
@author Jan Sanchez
###
##

(($) ->
  $.fn.removeClassRegEx = (regex) ->
    classes = $(this).attr("class")
    return false  if not classes or not regex
    classArray = []
    classes = classes.split(" ")
    i = 0
    len = classes.length

    while i < len
      classArray.push classes[i]  unless classes[i].match(regex)
      i++
    $(this).attr "class", classArray.join(" ")
    $ this

  return
) (jQuery)

window.log = () ->
    enviroment = () ->
        return /(local\.|dev\.|localhost)/gi.test(document.domain)

    if (typeof (console) != "undefined" && enviroment())
        if (typeof (console.log.apply) != "undefined")
            console.log.apply(console, arguments)
            return
        else
            console.log(Array.prototype.slice.call(arguments))
            return
    return

#Retorna el unicode humano
String::removeSigns = ->
  that = this
  table =
    ">": "Mayor de"
    "<": "Menor de"

  for esp of table
    espObj = new RegExp("[" + esp + "]", "gi")
    that = that.replace(espObj, table[esp])
  $.parseJSON "\"" + that + "\""

#remueve los acentos transformandolos a formato unicode
String::removeAccents = ->
  that = this
  espObj = null
  table =
    "ñ": "\\u00F1"
    "Ñ": "\\u00D1"
    "ç": "\\u00C7"
    ">": "Mayor de"
    "<": "Menor de"
    $: "\\u0024"
    "&": "\\u0026"
    "á": "\\u00E1"
    "à": "\\u00E0"
    "ã": "\\u00E3"
    "â": "\\u00E2"
    "ä": "\\u00E4"
    "Á": "\\u00C1"
    "À": "\\u00C0"
    "Ã": "\\u00C3"
    "Â": "\\u00C2"
    "Ä": "\\u00C4"
    "é": "\\u00E9"
    "è": "\\u00E8"
    "ë": "\\u00EB"
    "ê": "\\u00EA"
    "É": "\\u00C9"
    "È": "\\u00C8"
    "Ë": "\\u00CB"
    "Ê": "\\u00CA"
    "í": "\\u00ED"
    "ì": "\\u00EC"
    "ï": "\\u00EF"
    "î": "\\u00EE"
    "Í": "\\u00ED"
    "Ì": "\\u00EC"
    "Ï": "\\u00EF"
    "Î": "\\u00EE"
    "ó": "\\u00F3"
    "ò": "\\u00F2"
    "ö": "\\u00F6"
    "ô": "\\u00F4"
    "õ": "\\u00F5"
    "Ó": "\\u00D3"
    "Ò": "\\u00D2"
    "Ö": "\\u00D6"
    "Ô": "\\u00D4"
    "Õ": "\\u00D5"
    "ú": "\\u00FA"
    "ù": "\\u00F9"
    "ü": "\\u00FC"
    "û": "\\u00FB"
    "Ú": "\\u00DA"
    "Ù": "\\u00D9"
    "Ü": "\\u00DC"
    "Û": "\\u00DB"

  for esp of table
    espObj = new RegExp("[" + esp + "]", "gi")
    that = that.replace(espObj, table[esp])
  that

Cookie =
  create: (c, d, e) ->
    a = ""
    if e
      b = new Date()
      b.setTime b.getTime() + (e * 24 * 60 * 60 * 1000)
      a = "; expires=" + b.toGMTString()
    else
      a = ""

    #document.cookie = c + "=" + d + a + "; path=/application/busqueda/";
    document.cookie = c + "=" + d + a + "; path=/"
    this

  read: (b) ->
    e = b + "="
    a = document.cookie.split(";")
    d = 0

    while d < a.length
      f = a[d]
      f = f.substring(1, f.length)  while f.charAt(0) is " "
      return f.substring(e.length, f.length)  if f.indexOf(e) is 0
      d++
    null

  del: (a) ->
    @create a, "", -1

isArray = (element) ->
  result = false
  result = true  if Object::toString.call(element) is "[object Array]"
  result
##
setTimeout( ()->

    class Utils

    Utils.prototype.colorLog = (msg, color)->
        log("%c" + msg, "color:" + color + ";font-weight:bold")
        return

    Utils.prototype.loadYosonMCA = () ->
        lhref = window.location.href

        tempUrl = lhref.substr(lhref.indexOf('3000/modules/')+12)
        tempUrl = tempUrl.replace('.html','')
        tempUrl = tempUrl.replace('.phtml','')
        tempUrl = tempUrl.substr(1, tempUrl.length)

        #log(tempUrl)

        mainPath = tempUrl
        parts = mainPath.split('/')

        #if yOSON.static
        yOSON.module = parts[parts.length - 3]
        yOSON.controller = parts[parts.length - 2]
        yOSON.action = parts[parts.length-1] || 'index'
        return

    Utils.prototype.loadStaticFiles = () ->



        # Carga dinámica del module.css
        Module = document.createElement('link')
        Module.type = 'text/css'
        Module.rel = 'stylesheet'
        Module.media = 'all'
        Module.href = yOSON.statHost+'css/modules/'+yOSON.module+'/module_'+yOSON.module+'.css'+yOSON.statVers

        styleModule = document.getElementsByTagName('link')[document.getElementsByTagName('link').length-1]
        styleModule.parentNode.insertBefore(Module, styleModule)

        # Carga dinámica del module-controller.css
        controller = document.createElement('link')
        controller.type = 'text/css'
        controller.rel = 'stylesheet'
        controller.media = 'all'
        controller.href = yOSON.statHost+'css/modules/'+yOSON.module+'/'+yOSON.controller+'.css'+yOSON.statVers

        styleController = document.getElementsByTagName('link')[document.getElementsByTagName('link').length-1]
        styleController.parentNode.insertBefore(controller, styleController)



        objDependencyManager = new yOSON.Components.DependencyManager()
        depedencies = [
            'js/dist/scripts/modules/all_modules/all_modules.min.js',
            'js/dist/scripts/modules/'+yOSON.module+'/'+yOSON.controller+'/'+yOSON.controller+'.min.js',
            'js/dist/libs/yosonjs_utils/modules.js',
            'js/dist/libs/yosonjs_utils/app_load.js'
        ]
        objDependencyManager.ready(depedencies, ->
            log("librerías cargadas con éxito")
        )

    sourcePath = 'frontend/miproyecto/'

    yOSON.utils = new Utils()

    yOSON.utils.loadYosonMCA()
    #if yOSON.static
    yOSON.utils.loadStaticFiles()

    yOSON.utils.colorLog(' > ' + yOSON.module + ' | '+ yOSON.controller + ' | ' + yOSON.action, 'black');

    yOSON.utils.colorLog(' > jade view path: ' + sourcePath + 'jadeflux/modules/'+yOSON.module + '/' + yOSON.controller+'/'+yOSON.action+'.jade', 'gray');
    yOSON.utils.colorLog(' > coffee controller path: ' + sourcePath + 'coffee/scripts/modules/'+yOSON.module+'/'+yOSON.controller+'/', 'brown');
    yOSON.utils.colorLog(' > stylus module path: ' + sourcePath + 'stylus/modules/'+yOSON.module+'/module_'+yOSON.module+'.styl', 'green');
    yOSON.utils.colorLog(' > stylus controller path: ' + sourcePath + 'stylus/modules/'+yOSON.module+'/'+yOSON.controller+'.styl', 'green');
    yOSON.utils.colorLog(' - - - - - - - - - - - - - - - - ', 'black');


    return

, 150)
