###
Sirve para darle ancho a los botones amarillos anormales
@class delegate_width_buttons
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "delegate_width_buttons", (Sb) ->
	dom = {}

	st =
		btn_all      : ".btn_all"
		btn_yellow   : ".button_yellow"
		img_btn      : ".button_yellow img"
		number	     : 45
		width_offset : 30

	catchDom = ->
		dom.btn_all    = $(st.btn_all)
		dom.btn_yellow = $(st.btn_yellow)
		dom.img_btn    = $(st.img_btn)
		return

	fn =
		delegateWidthButtons : (element, number) ->
			element.each( ->
				$this = $(@)
				wParent = $this.parent().width()
				$this.css(
					"width" : wParent - number
				)
				return
			)
			return

		renderWidth : ->
			dom.img_btn.css("width", dom.btn_yellow.width() - st.width_offset)
			return

	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		fn.delegateWidthButtons(dom.btn_all, st.number)
		return

	return {
		init: initialize
	}