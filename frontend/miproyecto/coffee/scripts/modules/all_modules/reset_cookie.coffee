###
Modulo para resetear la cookie de busqueda
@class reset_cookie
@main all_modules/controller
@author Moises Yance, Wilson Flores
###

yOSON.AppCore.addModule "reset_cookie", (Sb) ->
    st = {
        right_mouse_button  : 3
        middle_mouse_button : 2
    }
    dom = {}
    defaults = {
        parent     : ".list_locations"
        el         : "li a"
        cookieName : "search_online"
        newCookie  : yOSON.tmp.cookie_online
    }

    catchDom = () ->
        dom.parent = $(st.parent)
        dom.el     = $(st.el, dom.parent)
        return

    suscribeEvents = () ->
        dom.el.on "click",   events.toReset
        dom.el.on "mouseup", events.toReset
        return

    events = {
        toReset: (e) ->
            fn.resetCookie(st.cookieName, st.newCookie)
            #log "toReset!"
            #e.preventDefault()
        mouseup: (e) ->
            if e.which is st.right_mouse_button or e.which is st.middle_mouse_button
                fn.resetCookie(st.cookieName, st.newCookie)
                e.preventDefault()
    }

    fn = {
        resetCookie : (cookieName, cookie) ->
            fn.saveCookie(cookieName, cookie)
            return
        saveCookie: (cookieName, cookie) ->
            Cookie.create(cookieName, JSON.stringify(cookie))
            #log "saveCookie!"
            return
    }

    initialize = (opts) ->
        st = $.extend({}, defaults, opts)
        catchDom()
        suscribeEvents()
        Sb.events(["allResetCookie"], fn.resetCookie, @)
        return

    return {
        init: initialize
    }

,["js/dist/libs/fancybox/source/jquery.fancybox.pack.js", "js/dist/libs/jquery-echo/jquery.echo.js"]
