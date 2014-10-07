(($)->
    $.fn.prettySelect = (options)->
        defaults = {
            target : "span"
            callback: ->
        }
        that = @
        settings = $.extend({}, defaults, options)
        onSelected = ->
            element = $(this)[0]
            value = element.options[element.selectedIndex].text
            $(settings.target).html(value)
            settings.callback.call(this, value, settings)

        @off("change.pretty_select").on("change.pretty_select", onSelected)
)(jQuery)
