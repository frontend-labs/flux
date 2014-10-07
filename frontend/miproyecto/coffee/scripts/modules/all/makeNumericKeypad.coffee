###
Construye el numeric keypad
@class makeNumericKeypad
@main pagoefectivomovil/Account
@author Paúl Díaz
###
yOSON.AppCore.addModule "makeNumericKeypad", (Sb) ->

    keypad = [1, 5, 4, 7, 9, 0, 2, 6, 3, 8]
    pin = []
    verificationPin = "1452"
    errorCount = 0

    st =
        numericKeypad : "#numericKeypad > ul"
        pin : "#xPin"
        clean : ".clean > a"
        frmAffiliate : "#frmAffiliate"

    dom = {}
    catchDom = ->
        dom.numericKeypad = $(st.numericKeypad)
        dom.pin = $(st.pin)
        dom.clean = $(st.clean)
        dom.frmAffiliate = $(st.frmAffiliate)
        return
    suscribeEvents = ->
        dom.clean.on 'click', functions.cleanPin
        dom.pin.on 'focusout', functions.verificationPin
        dom.frmAffiliate.on 'submit', events.validateSubmit
        return
    events =
        validateSubmit : (e) ->
            if dom.pin.hasClass 'error'
                functions.verificationPin()
                e.preventDefault()
            return
    functions = 
        makeNumericKeypad : ->
            $.each( keypad, (i, val) ->
                dom.numericKeypad.prepend    """
                                                <li>
                                                    <a id="number_0#{val}" class="number" data-number="#{val}" href="javascript:;"></a>
                                                </li>
                                            """
                if (keypad.length - 1) is i
                    dom.numericKeypad.children('li').each( (_i, item) ->
                        $(item).delay(400).fadeIn(_i * 400)
                        return
                    )
                    dom.numericKeypad.find('a.number').on 'click', functions.addNumber
                return
            )
            return
        addNumber : ->
            if pin.length < 4
                pin.push($(@).data('number'))
                dom.pin.val(pin.join(""))
            else
                return false
            if pin.length is 4
                functions.verificationPin()
                dom.pin.trigger 'focusout'
            return
        cleanPin :->
            dom.pin.val("")
            pin = []
            window.ParsleyUI.removeError(dom.pin.parsley(), 'verificationPin')
            return
        verificationPin : ->
            if dom.pin.val() is verificationPin
                errorCount++
                if errorCount is 6
                    log 'lo sentimos'
                if $('.parsley-errors-list').children('li').length < 1
                    window.ParsleyUI.addError(dom.pin.parsley(), 'verificationPin', '*PIN incorrecto')
                setTimeout( ->
                    dom.pin.removeClass('parsley-success').addClass('parsley-error error')
                , 100)
            else
                dom.pin.removeClass('error')
                window.ParsleyUI.removeError(dom.pin.parsley(), 'verificationPin')
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        functions.makeNumericKeypad()
        return

    return {
        init: initialize
    }