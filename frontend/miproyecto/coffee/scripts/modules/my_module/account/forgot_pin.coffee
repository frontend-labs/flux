###
Funcionaldidades para los modales de Olvidaste tu PIN
@class forgot_pin
@main flux/account
@author Paúl Díaz
###
yOSON.AppCore.addModule "forgot_pin", (Sb) ->
    dom = {}
    email = false

    st =
        frm_forgot_pin       : "#frmForgotPin"
        txt_email_recover    : "#txtEmailRecover"
        btn_recover_password : "#btnRecoverPassword"
        before_send          : "#beforeSend"
        after_send           : "#afterSend"
        fail_send            : "#failSend"
        speed                : 400

    catchDom = ->
        dom.frm_forgot_pin       = $(st.frm_forgot_pin)
        dom.txt_email_recover    = $(st.txt_email_recover)
        dom.btn_recover_password = $(st.btn_recover_password)
        dom.before_send          = $(st.before_send)
        dom.after_send           = $(st.after_send)
        dom.fail_send            = $(st.fail_send)
        return

    suscribeEvents = ->
        dom.btn_recover_password.on "click", events.sendEmail
        return

    events =
        sendEmail : ->
            if email
                dom.before_send.slideUp(st.speed, ->
                    dom.after_send.slideDown(st.speed)
                    return
                )
            else
                dom.fail_send.slideDown(st.speed)
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        return

    return {
        init: initialize
    }