###
Módulo para cargar en todo el sitio el plugin jquery-echo
@class load_plugins
@main flux/all
@author Jan Sanchez
###

yOSON.AppCore.addModule "load_plugins", (Sb) ->
    st = {}

    fn =
        loadPlugins : ->
            log 'load: jquery-echo.js'
            return

    initialize = (oP) ->
        $.extend st, oP
        fn.loadPlugins()
        return

    return {
        init: initialize
    }

,["js/dist/libs/jquery-echo/dist/jquery-echo.js"]
