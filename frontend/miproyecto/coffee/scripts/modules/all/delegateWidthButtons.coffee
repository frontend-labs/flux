###
Sirve para darle ancho a los botones amarillos anormales
@class delegateWidthButtons
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "delegateWidthButtons", (Sb) ->
	
	st =
		btnAll : ".btn_all"
		btnYellow : ".button_yellow"
		imgBtn : ".button_yellow img"
	dom = {}
	catchDom = ->
		dom.btnAll = $(st.btnAll)
		dom.btnYellow = $(st.btnYellow)
		dom.imgBtn = $(st.imgBtn)
		return
	functions = 
		delegateWidthButtons : (element, number) ->
			element.each( ->
				$this = $(@)
				wParent = $this.parent().width()
				$this.css(
					'width' : wParent - number
				)
				return
			)
			return
		renderWidth : ->
			dom.imgBtn.css("width",dom.btnYellow.width()-30)
	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		functions.delegateWidthButtons(dom.btnAll, 45)
		
		return

	return {
		init: initialize
	}