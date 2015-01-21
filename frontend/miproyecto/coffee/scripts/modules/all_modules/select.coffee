###
Genera la funcionalidad para un select customizado
@class select
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "select", (Sb) ->
    dom = {}

    st =
        select        : ".select"
        select_text   : ".select .selectText"
        select_select : ".select select"
        miliseconds   : 200

    catchDom = ->
        dom.select        = $(st.select)
        dom.select_text   = $(st.select_text)
        dom.select_select = $(st.select_select)
        return

    suscribeEvents = ->
        dom.select_select.on 'change', events.renderText
        return

    events =
        renderText : (e) ->
            _this = $(@)
            val = _this.find('option:selected').text()
            _this.parents('.select').find('.selectText').text(val)
            setTimeout( ->
                log _this.val()
                if _this.hasClass('parsley-success') and _this.val() isnt "0"
                    _this.parents('.select').removeClass('parsley-error').addClass('parsley-success')
                return
            , st.miliseconds)
            return

    fn =
        renderTitle : ->
            dom.select_select.each( (i, item) ->
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

        disabledSelect : ->
            dom.select_select.each( (i, item) ->
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
            dom.select_select.each( (i, item) ->
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
        fn.renderTitle()
        Sb.events(['disabledSelect'], fn.disabledSelect, @)
        Sb.events(['validateSelect'], fn.validateSelect, @)
        return

    return {
        init: initialize
    }