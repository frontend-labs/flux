###
Agrega funcionalidad de placeholder a navegadores que no lo soporten
@class placeholder
@main flux/all
@author Ana Reyna
###
yOSON.AppCore.addModule "placeholder", (Sb) ->
    dom = {}

    st =
        inputs : "input, textarea"

    catchDom = ->
        dom.inputs = $(st.inputs)
        return

    fn =
        enablePlaceholder : ->
            dom.inputs.placeholder()
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        fn.enablePlaceholder()
        return

    return {
        init: initialize
    }

, ["js/dist/libs/jquery-placeholder/jquery.placeholder.js"]
