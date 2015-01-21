###
el plugin AttrChange sirve para detectar cambios en los atributos de elementos
@class init_attr_change
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "init_attr_change", (Sb) ->
    dom = {}

    st =
        select        : ".select"
        select_select : ".select > select"


    catchDom = ->
        dom.select        = $(st.select)
        dom.select_select = $(st.select_select)
        return

    fn =
        selectAttrChange : ->
            dom.select_select.each( (i, item)->
                _this = $(item)
                _this.attrchange(
                    trackValues : true
                    callback : (e) ->
                        if _this.val() is "0"
                            _this.parent().removeClass("parsley-success").addClass("parsley-error")
                        else
                            _this.parent().addClass("parsley-success")
                        return
                )
                return
            )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        fn.selectAttrChange()
        return

    return {
        init: initialize
    }

, ["js/dist/libs/attrchange.js"]