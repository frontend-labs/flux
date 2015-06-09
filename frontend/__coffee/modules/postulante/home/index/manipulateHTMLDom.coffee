###
Modulo para manipular cambios del html al cargarse la pagina
@class manipulateHTMLDom
@main Postulante
###
yOSON.AppCore.addModule "manipulateHTMLDom", (Sb) ->
    dom = {}
    st  =
        tagImg : "[data-png]"

    catchDom = ->
        dom.tagImg = $(st.tagImg)
        return

    afterCatchDom = ->
        if browser.msie and browser.version is "8.0"
            functions.changeSvgToPng()
        return

    functions =
        changeSvgToPng : () ->
            if dom.tagImg.length isnt 0
                $.each(dom.tagImg, (i, elem) ->
                    newURL = $(elem).data("png")
                    $(elem).attr("src", newURL)
                    return
                )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        afterCatchDom()
        return

    return {
        init: initialize
    }