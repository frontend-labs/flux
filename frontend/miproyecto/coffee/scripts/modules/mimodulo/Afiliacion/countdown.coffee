###
Funcionalidad del countdown para limitar el tiempo de estadía sin uso del user
@class countdown
@main pagoefectivomovil/Afiliacion
@author Paúl Díaz
###
yOSON.AppCore.addModule "countdown", (Sb) ->

    st =
        countdown : "#countdown"
        callErrorRepeated : "#callErrorRepeated"

    dom = {}
    catchDom = ->
        dom.countdown = $(st.countdown)
        dom.callErrorRepeated = $(st.callErrorRepeated)
        return
    suscribeEvents = ->
        #dom.countdown.on 'click', functions.countdown
        return
    functions = 
        countdown: ->
            dom.countdown.countdown(
                date : +(new Date()) + 10000
                render : (data) ->
                    $(this.el).text(this.leadingZeros(data.sec, 2) + " sec")
                    return
                onEnd : ->
                    dom.callErrorRepeated.trigger 'click'
                    return
            )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        functions.countdown()
        return

    return {
        init: initialize
    }

, ['js/dist/libs/jquery.countdown.js']