###
Genera la funcionalidad para un select customizado
@class select
@main pagoefectivomovil/All
@author Paúl Díaz
###
yOSON.AppCore.addModule "select", (Sb) ->

    st =
        select : ".select"
        selectText : ".select .selectText"
        selectSelect : ".select select"

    dom = {}
    catchDom = ->
        dom.select = $(st.select)
        dom.selectText = $(st.selectText)
        dom.selectSelect = $(st.selectSelect)
        return
    suscribeEvents = ->
        dom.selectSelect.on 'change', functions.renderText

        return
    functions = 
        renderTitle : ->
            dom.selectSelect.each( (i, item) ->
                $this = $(item)
                title = $this.attr('title')
                if title.length
                    #log title
                    $this.siblings('.selectText').text(title)
                else
                    $this.find('option').each( ->
                        if $(@).val() is "1"
                            $(@).prop('selected', true)
                            $this.siblings('.selectText').text($(@).text())
                        return
                    )
                return
            )
            return
        renderText : ->
            _this = $(@)
            val = _this.find('option:selected').text()
            _this.parents('.select').find('.selectText').text(val)
            setTimeout( ->
                log _this.val()
                if _this.hasClass('parsley-success') and _this.val() isnt "0"
                    _this.parents('.select').removeClass('parsley-error').addClass('parsley-success')
                return
            , 200)
            return
        disabledSelect : ->
            dom.selectSelect.each( (i, item) ->
                _this = $(item)
                log _this.val()
                if _this.hasClass('disabled')
                    _this.parent().removeClass('parsley-success').addClass('disabled')
                    val = _this.find('option:selected').text()
                    _this.parent('.select').find('.selectText').text(val)
                else
                    #log _this
                    _this.parent().removeClass('disabled').addClass('parsley-success')
                return
            )
        validateSelect : ->
            dom.selectSelect.each( (i, item) ->
                _this = $(item)
                #if _this.val() is "0"
                    #log _this.parent() 
                    #_this.parent('.select').removeClass('parsley-success')
                return
            )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        suscribeEvents()
        functions.renderTitle()
        Sb.events(['disabledSelect'], functions.disabledSelect, this)
        Sb.events(['validateSelect'], functions.validateSelect, this)
        return

    return {
        init: initialize
    }