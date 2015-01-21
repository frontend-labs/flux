###
Alinea al elemento con respecto de su padre
@class vertical_align_middle
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "vertical_align_middle", (Sb) ->
    dom = {}

    st =
        affiliated_establishments          : ".affiliated_establishments > ul"
        affiliated_establishments_elements : ".affiliated_establishments > ul > li"
        footer                             : "footer"
        footer_elements                    : ".footer_left, .footer_right"
        item_menu                          : ".menu ul li"
        item_menu_elements                 : ".menu ul li a"

    catchDom = ->
        dom.affiliated_establishments          = $(st.affiliated_establishments)
        dom.affiliated_establishments_elements = $(st.affiliated_establishments_elements)
        dom.footer                             = $(st.footer)
        dom.footer_elements                    = $(st.footer_elements)
        dom.item_menu                          = $(st.item_menu)
        dom.item_menu_elements                 = $(st.item_menu_elements)
        return

    fn =
        verticalAlignMiddle : (childrens, parent) ->
            childrens.each( ->
                $this = $(@)
                h_children = $this.height()
                h_parent = parent.height()
                $this.css(
                    'margin-top' : (h_parent - h_children) / 2
                )
                return
            )
            return

    initialize = (oP) ->
        $.extend st, oP
        catchDom()
        fn.verticalAlignMiddle(dom.footer_elements, dom.footer)
        fn.verticalAlignMiddle(dom.affiliated_establishments_elements, dom.affiliated_establishments)
        fn.verticalAlignMiddle(dom.item_menu_elements, dom.item_menu)
        return

    return {
        init: initialize
    }