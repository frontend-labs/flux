###
Hace un reload al selectivizr para su funcionamiento optimo
@class reload_selectivizr
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "reload_selectivizr", (Sb) ->
    st = {}

    fn =
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
        fn.reloadSelectivizr()
        return

    return {
        init: initialize
    }