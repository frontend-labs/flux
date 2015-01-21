###
Crea el picker usando el plugin de jquery-ui
@class picker
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "picker", (Sb) ->
    dom = {}

    st =
        picker     : ".picker"
        pickerSpan : ".picker > span"
        txtExpiry  : "#xCaducidad"

    catchDom = ->
        dom.picker     = $(st.picker)
        dom.pickerSpan = $(st.pickerSpan)
        dom.txtExpiry  = $(st.txtExpiry)
        return

    suscribeEvents = ->
        dom.pickerSpan.on "click", events.clickPicker
        return

    events =
        clickPicker : (e) ->
            dom.txtExpiry.trigger "focus"
            return

    functions =
        picker : ->
            $.datepicker.setDefaults($.datepicker.regional["es"])
            dom.txtExpiry.datepicker(
                dateFormat: "dd/mm/y"
                onSelect : ->
                    dom.txtExpiry.trigger "blur"
                    return
            )
            return


    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        functions.picker()
        return

    return {
        init: initialize
    }

, ["js/dist/libs/jquery-ui/jquery-ui.min.js", "js/dist/libs/jquery-ui/ui/i18n/datepicker-es.js"]