###
Alinea al elemento con respecto de su padre
@class verticalAlignMiddle
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "verticalAlignMiddle", (Sb) ->
	st =
		affiliatedEstablishments : ".affiliated_establishments > ul"
		affiliatedEstablishmentsElements : ".affiliated_establishments > ul > li"
		footer : "footer"
		footerElements : ".footer_left, .footer_right"
		itemMenu: ".menu ul li"
		itemMenuElements: ".menu ul li a"

	dom = {}
	catchDom = ->
		dom.affiliatedEstablishments = $(st.affiliatedEstablishments)
		dom.affiliatedEstablishmentsElements = $(st.affiliatedEstablishmentsElements)
		dom.footer = $(st.footer)
		dom.footerElements = $(st.footerElements)
		dom.itemMenu = $(st.itemMenu)
		dom.itemMenuElements = $(st.itemMenuElements)
		return
	functions = 
		verticalAlignMiddle : (childrens, parent) ->
			childrens.each( ->
				$this = $(@)
				hChildren = $this.height()
				hParent = parent.height()
				$this.css(
					'margin-top' : (hParent - hChildren) / 2
				)
				return
			)
			return

	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		functions.verticalAlignMiddle(dom.footerElements, dom.footer)
		functions.verticalAlignMiddle(dom.affiliatedEstablishmentsElements, dom.affiliatedEstablishments)
		functions.verticalAlignMiddle(dom.itemMenuElements, dom.itemMenu)
		return

	return {
		init: initialize
	}