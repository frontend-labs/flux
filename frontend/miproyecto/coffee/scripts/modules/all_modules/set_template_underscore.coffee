###
Set configuration for underscore plugin
@class set_template_underscore
@main flux/all
@author Pedro Vega
###
yOSON.AppCore.addModule "set_template_underscore", (Sb) ->
    st =
        evaluate    : /\{\{([\s\S]+?)\}\}/g
        interpolate : /\{\{=([\s\S]+?)\}\}/g
        escape      : /\{\{-([\s\S]+?)\}\}/g

    fn =
        setTemplateSettings : ->
            _.templateSettings =
                evaluate    : st.evaluate
                interpolate : st.interpolate
                escape      : st.escape
            return

    initialize = (oP) ->
        $.extend st, oP
        fn.setTemplateSettings()
        return

    return {
        init: initialize
    }

, ["js/dist/libs/underscore/underscore.js"]
