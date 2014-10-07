###
Módulo para cargar en todo el sitio el plugin jquery-echo
@class load_plugins
@main urbania-online/all
@author Jan Sanchez
###

yOSON.AppCore.addModule "load_plugins", (Sb) ->
  settings = {}
  defaults = {}
  functions = {
    loadPlugins : () ->
      log 'load: jquery-echo.js'
      return
  }

  init: (opts) ->
    settings = $.extend({}, defaults, opts)

    functions.loadPlugins()
    return
,["js/dist/libs/jquery-echo/dist/jquery-echo.js"]
