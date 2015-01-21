###
Validando celular
@class validating_cel
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "validating_cel", (Sb) ->
    dom = {}
    cel_bloqueado = "987654321"
    cel_momo      = "123456789"
    operator_momo = "1"

    st =
        txt_cel                       : "#xMovil"
        momo_pin                      : "#momoPin"
        select_operator               : "#iOperador"
        pin                           : "#xPin"
        pagoefectivo_already_register : "#pagoefectivoAlreadyRegister"
        change_personal_data          : "#changePersonalData"
        select_dni                    : "#iTipoDocumento"
        txt_dni                       : "#xDocumento"
        txt_expiry                    : "#xCaducidad"
        txt_name                      : "#xNombres"
        txt_surname_pat               : "#xApePaterno"
        txt_surname_mat               : "#xApeMaterno"
        txt_email                     : "#xEmail"
        chk_terms                     : "#lPolitica"
        chk_marketing                 : "#lPolitica"
        btn_log_in                    : "#btnLogIn"
        btn_step_01                   : "#btnStep01"
        blocked                       : "#blocked"

    catchDom = ->
        dom.txt_cel                       = $(st.txt_cel)
        dom.momo_pin                      = $(st.momo_pin)
        dom.select_operator               = $(st.select_operator)
        dom.pin                           = $(st.pin)
        dom.pagoefectivo_already_register = $(st.pagoefectivo_already_register)
        dom.change_personal_data          = $(st.change_personal_data)
        dom.select_dni                    = $(st.select_dni)
        dom.txt_dni                       = $(st.txt_dni)
        dom.txt_expiry                    = $(st.txt_expiry)
        dom.txt_name                      = $(st.txt_name)
        dom.txt_surname_pat               = $(st.txt_surname_pat)
        dom.txt_surname_mat               = $(st.txt_surname_mat)
        dom.txt_email                     = $(st.txt_email)
        dom.chk_terms                     = $(st.chk_terms)
        dom.chk_marketing                 = $(st.chk_marketing)
        dom.btn_log_in                    = $(st.btn_log_in)
        dom.btn_step_01                   = $(st.btn_step_01)
        dom.blocked                       = $(st.blocked)
        return

    suscribeEvents = ->
        dom.txt_cel.on "focusout", events.validatingCel
        return

    events =
        validatingCel : ->
            blocked = [dom.select_operator, dom.select_dni, dom.txt_dni, dom.txt_name, dom.txt_surname_pat, dom.txt_surname_mat, dom.txt_email]

            if dom.blocked.length
                number = $(@).val()
                if number is cel_bloqueado
                    dom.blocked.fadeIn()

            if dom.momo_pin.length
                number = $(@).val()
                #operator = dom.select_operator.find("option:selected").val()
                #if operator is operator_momo and number is cel_momo
                if number is cel_momo
                    dom.momo_pin.slideDown()
                    dom.pin.attr("required", "").parsley()
                    dom.pagoefectivo_already_register.slideDown()
                    dom.change_personal_data.slideDown()
                    fn.disabledInput(blocked, true)

                else
                    dom.momo_pin.slideUp()
                    dom.pin.removeAttr("required").removeClass("parsley-error").parsley().destroy()
                    dom.pagoefectivo_already_register.slideUp()
                    dom.change_personal_data.slideUp()
                    fn.disabledInput(blocked, false)

                Sb.trigger("disabledSelect")
                Sb.trigger("callEqualingHeights")
            return

    fn =
        disabledInput: (array, disabled) ->
            values = [1, 1, 46737335, "Paúl", "Díaz", "Navarrete", 0]
            clean = [0, 1, "", "", "", "", "", ""]
            if disabled
                $.each(array, (i, item) ->
                    if values[i] isnt 0
                        item.val(values[i]).prop("disabled", disabled).addClass("disabled").trigger("blur")
                    return
                )
            else
                $.each(array, (i, item) ->
                    item.val(clean[i]).prop("disabled", disabled).removeClass("disabled")
                    return
                )
            Sb.trigger("disabledSelect")
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()

        return

    return {
        init: initialize
    }