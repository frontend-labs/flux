###
el plugin AttrChange sirve para detectar cambios en los atributos de elementos
@class add_msie
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "add_msie", (Sb) ->
    st =
        msie_regex : /MSIE ([0-9]+)\./

    fn =
        setConfiguration : ->
            jQuery.browser = {}
            jQuery.browser.msie = false
            jQuery.browser.version = 0
            if navigator.userAgent.match st.msie_regex
                jQuery.browser.msie = true
                jQuery.browser.version = RegExp.$1
            return


    initialize = (oP) ->
        $.extend oP
        fn.setConfiguration()
        return

    return {
        init: initialize
    }