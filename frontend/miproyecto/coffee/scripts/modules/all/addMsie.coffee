###
el plugin AttrChange sirve para detectar cambios en los atributos de elementos
@class addMsie
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "addMsie", (Sb) ->
    dom = {}
    catchDom = ->
        return
    suscribeEvents = ->
        return
    functions = 
        addMsie: ->
            jQuery.browser = {}
            (->
                jQuery.browser.msie = false
                jQuery.browser.version = 0
                if navigator.userAgent.match(/MSIE ([0-9]+)\./)
                    jQuery.browser.msie = true
                    jQuery.browser.version = RegExp.$1
                return
            )()
            return

    initialize = (oP) ->
        $.extend oP
        catchDom()
        suscribeEvents()
        functions.addMsie()
        return

    return {
        init: initialize
    }