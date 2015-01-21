###
Permite crear un accordion
@class accordion
@main flux/all
@author Luis Natividad
###
yOSON.AppCore.addModule "accordion", (Sb) ->
    dom = {}

    st =
        accordion      : ".accordion"
        container      : ".container"
        accordion_icon : ".accordion span"
        head           : "head"
        meta_viewport  : "<meta name='viewport' content='width=device-width, user-scalable=no'>"
        hide_speed     : 500

    catchDom = ->
        dom.accordion = $(st.accordion)
        dom.container = $(st.container)
        dom.accordion_icon = $(st.accordion_icon)
        dom.head = $(st.head)
        return

    suscribeEvents = ->
        dom.accordion.on "click", events.open
        return

    events =
        open : (e) ->
            _this = $(this)
            if _this.next(st.container).is ":visible"
                _this.next(st.container).hide(st.hide_speed)
                _this.children("span").html "+"
            else
                dom.container.hide()
                dom.accordion_icon.html "+"
                _this.next(st.container).show "slow"
                _this.children("span").html "-"
            return

    fn =
        appendMetaViewport: ->
            dom.head.append st.meta_viewport
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        fn.appendMetaViewport()
        return

    return {
        init: initialize
    }


