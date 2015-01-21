###
Realiza la validación con parsleyjs.org
@class parsley_validation
@main flux/all
@author Ana Reyna
###
yOSON.AppCore.addModule "parsley_validation", (Sb) ->
    dom = {}

    st =
        form                : "form"
        frm_affiliate       : "#frmAffiliate"
        btn                 : "#frmAffiliate .button"
        parsley_errors_list : ".parsley-errors-list"
        body                : "body"
        width_offset        : 12
        left_offset         : 2

    catchDom = ->
        dom.form                = $(st.form)
        dom.frm_affiliate       = $(st.frm_affiliate)
        dom.btn                 = $(st.btn)
        dom.parsley_errors_list = $(st.parsley_errors_list)
        dom.body                = $(st.body)
        return

    suscribeEvents = ->
        dom.body.on "keyup click", events.removeUnactive
        dom.btn.on  "click",       events.callValidateSelect
        return

    events =
        removeUnactive : (e) ->
            if dom.frm_affiliate.length
                if dom.frm_affiliate.parsley().isValid()
                    dom.btn.removeClass("unactive")
                else
                    dom.btn.addClass("unactive")
            return

        callValidateSelect : (e) ->
            Sb.trigger("validateSelect")
            return

    fn =
        validate : ->
            window.ParsleyValidator.setLocale("es")
            return

        marginErrorList : ->
            dom.parsley_errors_list.each( (i, item) ->
                $this = $(item)
                width = $this.prev().width() + st.width_offset
                left = $this.prev().position().left + st.left_offset
                $this.css(
                    "margin": "0 0 0 #{left}px"
                    "max-width": width
                )
                return
            )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        fn.validate()
        fn.marginErrorList()
        return

    return {
        init: initialize
    }

, ["js/dist/libs/parsleyjs/dist/parsley.min.js", "js/dist/libs/parsleyjs/src/i18n/es.js"]
