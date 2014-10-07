###
Funcionaldidades para los modales de Olvidaste tu PIN
@class forgotPin
@main pagoefectivomovil/Account
@author Paúl Díaz
###
yOSON.AppCore.addModule "forgotPin", (Sb) ->

    st =
        frmForgotPin : "#frmForgotPin"
        txtEmailRecover : "#txtEmailRecover"
        btnRecoverPassword : "#btnRecoverPassword"
        beforeSend : "#beforeSend"
        afterSend : "#afterSend"
        failSend : "#failSend"

    email = false

    dom = {}
    catchDom = ->
        dom.frmForgotPin = $(st.frmForgotPin)
        dom.txtEmailRecover = $(st.txtEmailRecover)
        dom.btnRecoverPassword = $(st.btnRecoverPassword)
        dom.beforeSend = $(st.beforeSend)
        dom.afterSend = $(st.afterSend)
        dom.failSend = $(st.failSend)
        return
    suscribeEvents = ->
        dom.btnRecoverPassword.on 'click', functions.sendEmail
        return
    functions = 
        sendEmail : ->
            if email
                dom.beforeSend.slideUp(400, ->
                    dom.afterSend.slideDown(400)
                    return
                )
            else
                dom.failSend.slideDown(400)
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        return

    return {
        init: initialize
    }