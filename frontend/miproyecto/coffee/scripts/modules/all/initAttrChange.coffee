###
el plugin AttrChange sirve para detectar cambios en los atributos de elementos
@class initAttrChange
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "initAttrChange", (Sb) ->
    st =
        select : ".select"
        selectSelect : ".select > select"

    dom = {}
    catchDom = ->
        dom.select = $(st.select)
        dom.selectSelect = $(st.selectSelect)
        return
    suscribeEvents = ->
        #dom.countdown.on 'click', functions.countdown
        return
    functions = 
        selectAttrChange: ->
            dom.selectSelect.each( (i, item)->
                _this = $(item)
                _this.attrchange(
                    trackValues : true
                    callback : (e) ->
                        if _this.val() is "0"
                            _this.parent().removeClass('parsley-success').addClass('parsley-error')
                        else
                            _this.parent().addClass('parsley-success')
                        return
                )
                return
            )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        functions.selectAttrChange()
        return

    return {
        init: initialize
    }

, ['js/dist/libs/attrchange.js']