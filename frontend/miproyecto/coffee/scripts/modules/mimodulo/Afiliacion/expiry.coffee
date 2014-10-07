###
Muestra la ayuda para la caducidad
@class expiry
@main pagoefectivomovil/Afiliacion
@author Paúl Díaz
###
yOSON.AppCore.addModule "expiry", (Sb) ->

    st =
        expiry : ".expiry"
        expiryImg : ".expiry > img"

    dom = {}
    catchDom = ->
        dom.expiry = $(st.expiry)
        dom.expiryImg = $(st.expiryImg)
        return
    suscribeEvents = ->
        dom.expiry.on 'click', functions.expiry
        return
    functions = 
        expiry: ->
            if dom.expiryImg.hasClass 'active'
                dom.expiryImg.fadeOut().removeClass('active')
            else
                dom.expiryImg.fadeIn().addClass('active')
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        return

    return {
        init: initialize
    }