###
Muestra la ayuda para la caducidad
@class expiry
@main flux/affiliation
@author Paúl Díaz
###
yOSON.AppCore.addModule "expiry", (Sb) ->
    dom = {}

    st =
        expiry    : ".expiry"
        expiryImg : ".expiry > img"

    catchDom = ->
        dom.expiry    = $(st.expiry)
        dom.expiryImg = $(st.expiryImg)
        return

    suscribeEvents = ->
        dom.expiry.on "click", events.expiry
        return

    events =
        expiry : ->
            if dom.expiryImg.hasClass "active"
                dom.expiryImg.fadeOut().removeClass("active")
            else
                dom.expiryImg.fadeIn().addClass("active")
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        return

    return {
        init: initialize
    }