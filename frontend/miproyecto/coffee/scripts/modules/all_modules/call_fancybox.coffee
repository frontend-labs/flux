###
Llamamos al Fancybox y definimos los modales
@class call_fancybox
@main flux/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "call_fancybox", (Sb) ->
	dom = {}

	st =
		fancybox_inline : ".fancybox_inline"
		steps_to_guide  : "#btnPrintStepsGuide"
		video           : ".video"

	catchDom = ->
		dom.fancybox_inline = $(st.fancybox_inline)
		dom.steps_to_guide  = $(st.steps_to_guide)
		dom.video           = $(st.video)
		return

	fn =
		callFancybox : ->
			if dom.fancybox_inline.length
				dom.fancybox_inline.fancybox(
					fitToView	: false
					autoSize	: true
					maxWidth	: 500
					width		: "65%"
					closeClick	: false
					openEffect	: "fade"
					closeEffect	: "fade"
					padding		: [25, 20, 20, 20]
				)
			else
				dom.video.fancybox(
					fitToView	: false
					autoSize	: true
					closeClick	: false
					openEffect	: "fade"
					closeEffect	: "fade"
					padding		: [0, 0, 0, 0]
				)

			return

	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		fn.callFancybox()
		return

	return {
		init: initialize
	}

, ["js/dist/libs/fancybox/source/jquery.fancybox.pack.js"]
