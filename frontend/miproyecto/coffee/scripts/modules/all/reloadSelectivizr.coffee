###
Hace un reload al selectivizr para su funcionamiento optimo
@class reloadSelectivizr
@main pagoefectivomovil/All
@author Paúl Díaz
###
yOSON.AppCore.addModule "reloadSelectivizr", (Sb) ->

    st =

    dom = {}

    catchDom = ->
        return

    functions = 
        reloadSelectivizr : ->
            if $.browser.msie
                setTimeout (->
                    if Selectivizr
                        Selectivizr.reload()
                        log 'Selectivizr isnt defined.'
                    return
                ), 300
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        functions.reloadSelectivizr()
        return

    return {
        init: initialize
    }