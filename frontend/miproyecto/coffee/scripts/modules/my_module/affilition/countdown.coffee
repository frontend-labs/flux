###
Funcionalidad del countdown para limitar el tiempo de estadía sin uso del user
@class countdown
@main flux/affiliation
@author Paúl Díaz
###
yOSON.AppCore.addModule "countdown", (Sb) ->
    dom = {}

    st =
        countdown           : "#countdown"
        call_error_repeated : "#callErrorRepeated"
        time_offset         : 10000
        leading_zeros       : 2

    catchDom = ->
        dom.countdown           = $(st.countdown)
        dom.call_error_repeated = $(st.call_error_repeated)
        return

    suscribeEvents = ->
        dom.countdown.on "click", events.countdown
        return

    events =
        countdown: ->
            dom.countdown.countdown(
                date : +(new Date()) + st.time_offset
                render : (data) ->
                    $(this.el).text(this.leadingZeros(data.sec, st.leading_zeros) + " sec")
                    return
                onEnd : ->
                    dom.call_error_repeated.trigger "click"
                    return
            )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        events.countdown()
        return

    return {
        init: initialize
    }

, ["js/dist/libs/jquery.countdown.js"]