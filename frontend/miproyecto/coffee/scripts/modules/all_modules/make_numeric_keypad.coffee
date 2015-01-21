###
Construye el numeric keypad
@class make_numeric_keypad
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "make_numeric_keypad", (Sb) ->
    dom = {}
    keypad = [1, 5, 4, 7, 9, 0, 2, 6, 3, 8]
    pin = []
    verification_pin = "1452"
    error_count = 0

    st =
        numeric_keypad  : "#numericKeypad > ul"
        pin             : "#xPin"
        clean           : ".clean > a"
        frm_affiliate   : "#frmAffiliate"
        speed_delay     : 400
        max_length_pin  : 4
        max_error_count : 6
        miliseconds     : 100

    catchDom = ->
        dom.numeric_keypad = $(st.numeric_keypad)
        dom.pin            = $(st.pin)
        dom.clean          = $(st.clean)
        dom.frm_affiliate  = $(st.frm_affiliate)
        return

    suscribeEvents = ->
        dom.clean.on         "click",    events.cleanPin
        dom.pin.on           "focusout", events.verificationPin
        dom.frm_affiliate.on "submit",   events.validateSubmit
        return

    events =
        validateSubmit : (e) ->
            if dom.pin.hasClass "error"
                events.verificationPin()
                e.preventDefault()
            return

        verificationPin : (e) ->
            if dom.pin.val() is verification_pin
                error_count++
                if error_count is st.max_error_count
                    log "lo sentimos"
                if $(".parsley-errors-list").children("li").length < 1
                    window.ParsleyUI.addError(dom.pin.parsley(), "verificationPin", "*PIN incorrecto")
                setTimeout(fn.removeSuccess, st.miliseconds)
            else
                dom.pin.removeClass("error")
                window.ParsleyUI.removeError(dom.pin.parsley(), "verificationPin")
            return

        cleanPin : (e) ->
            dom.pin.val("")
            pin = []
            window.ParsleyUI.removeError(dom.pin.parsley(), "verificationPin")
            return

    fn =
        makeNumericKeypad : ->
            $.each( keypad, (i, val) ->
                dom.numeric_keypad.prepend  """
                                                <li>
                                                    <a id="number_0#{val}" class="number" data-number="#{val}" href="javascript:;"></a>
                                                </li>
                                            """
                if (keypad.length - 1) is i
                    dom.numeric_keypad.children("li").each( (_i, item) ->
                        $(item).delay(st.speed_delay).fadeIn(_i * st.speed_delay)
                        return
                    )
                    dom.numeric_keypad.find("a.number").on "click", fn.addNumber
                return
            )
            return

        addNumber : ->
            if pin.length < st.max_length_pin
                pin.push($(@).data("number"))
                dom.pin.val(pin.join(""))
            else
                return false
            if pin.length is st.max_length_pin
                events.verificationPin()
                dom.pin.trigger "focusout"
            return

        removeSuccess : ->
            dom.pin.removeClass("parsley-success").addClass("parsley-error error")
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        fn.makeNumericKeypad()
        return

    return {
        init: initialize
    }