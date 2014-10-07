###
Igualará las alturas de 2 elementos, siendo la altura final la del elemento más alto
@class equalingHeights
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "equalingHeights", (Sb) ->
	
	st =
		boxForm : ".box_form"
		boxIntroduction : ".box_introduction"

	dom = {}
	catchDom = ->
		dom.boxForm = $(st.boxForm)
		dom.boxIntroduction = $(st.boxIntroduction)
		return
	functions = 
		equalingHeights : (firstElement, secondElement) ->
			firstElement.css(
				'min-height' : 0
			)
			secondElement.css(
				'min-height' : 0
			)
			fisrtH = firstElement.height()
			secondH = secondElement.height()
			if fisrtH > secondH
				secondElement.css(
					'min-height' : fisrtH
				)
			else
				firstElement.css(
					'min-height' : secondH
				)
			return
		callEqualingHeights: ->
			functions.equalingHeights(dom.boxIntroduction, dom.boxForm)
			return

	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		functions.equalingHeights(dom.boxIntroduction, dom.boxForm)
		Sb.events(['callEqualingHeights'], functions.callEqualingHeights, this)
		return

	return {
		init: initialize
	}