###
Llamamos al Fancybox y definimos los modales
@class callFancybox
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "callFancybox", (Sb) ->
	dom = {}
	st =
		fancyboxInline : ".fancybox_inline"
		steps_to_guide : "#btn_print_steps_to_guide"
		video : ".video"
	catchDom = ->
		dom.fancyboxInline = $(st.fancyboxInline)
		dom.steps_to_guide = $(st.steps_to_guide)
		dom.video = $(st.video)
		return
	functions = 
		callFancybox: ->
			if dom.fancyboxInline.length
				dom.fancyboxInline.fancybox(
					fitToView	: false
					autoSize	: true
					maxWidth	: 500
					width		: '65%'
					closeClick	: false
					openEffect	: 'fade'
					closeEffect	: 'fade'
					padding		: [25, 20, 20, 20]
				)
			else 
				if dom.steps_to_guide.length
					dom.steps_to_guide.fancybox(
						fitToView	: false
						autoSize	: true
						closeClick	: false
						openEffect	: 'fade'
						closeEffect	: 'fade'
						padding		: [25, 27, 20, 27]
					)
				else
					dom.video.fancybox(
						fitToView	: false
						autoSize	: true
						closeClick	: false
						openEffect	: 'fade'
						closeEffect	: 'fade'
						padding		: [0, 0, 0, 0]
					)

			return

	initialize = (oP) ->
		$(document).ready( () ->
			$.extend st, oP
			catchDom()
			functions.callFancybox()
			return
		)

	return {
		init: initialize
	}

, ['js/dist/libs/fancybox/source/jquery.fancybox.pack.js']
