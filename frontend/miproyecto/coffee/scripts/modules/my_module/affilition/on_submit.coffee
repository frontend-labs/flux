###
Acciones en el momento del submit
@class on_submit
@main flux/affiliation
@author Paúl Díaz
###
yOSON.AppCore.addModule "on_submit", (Sb) ->
    dom = {}

    st =
        frm_affiliate : "#frm_affiliate"

    catchDom = ->
        dom.frm_affiliate = $(st.frm_affiliate)
        return

    suscribeEvents = ->
        dom.frm_affiliate.on "submit", functions.onSubmit
        return

    functions =
        onSubmit: ->
            log "submit"
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        return

    return {
        init: initialize
    }