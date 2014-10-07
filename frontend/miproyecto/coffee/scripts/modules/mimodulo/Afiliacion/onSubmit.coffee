###
Acciones en el momento del submit
@class onSubmit
@main pagoefectivomovil/Afiliacion
@author Paúl Díaz
###
yOSON.AppCore.addModule "onSubmit", (Sb) ->
    log 'onsubmit'
    st =
        frmAffiliate : "#frmAffiliate"

    dom = {}
    catchDom = ->
        dom.frmAffiliate = $(st.frmAffiliate)
        return
    suscribeEvents = ->
        dom.frmAffiliate.on 'submit', functions.onSubmit
        return
    functions = 
        onSubmit: ->
            log 'submit'
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        return

    return {
        init: initialize
    }