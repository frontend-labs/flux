###
Igualará las alturas de 2 elementos, siendo la altura final la del elemento más alto
@class equaling_heights
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "equaling_heights", (Sb) ->
    dom = {}

    st =
        box_form         : ".box_form"
        box_introduction : ".box_introduction"

    catchDom = ->
        dom.box_form         = $(st.box_form)
        dom.box_introduction = $(st.box_introduction)
        return

    fn =
        equalingHeights : (firstElement, secondElement) ->
            firstElement.css(
                "min-height" : 0
            )
            secondElement.css(
                "min-height" : 0
            )
            firstH = firstElement.height()
            secondH = secondElement.height()
            if firstH > secondH
                secondElement.css(
                    "min-height" : firstH
                )
            else
                firstElement.css(
                    "min-height" : secondH
                )
            return

        callEqualingHeights : ->
            fn.equalingHeights(dom.box_introduction, dom.box_form)
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        fn.equalingHeights(dom.box_introduction, dom.box_form)
        Sb.events(["callEqualingHeights"], fn.callEqualingHeights, this)
        return

    return {
        init: initialize
    }