###
Modulo para crear los metodos de animacion de aladino
@class aladino
@main my_module/game
@author 
###

yOSON.AppCore.addModule "aladino", (Sb) ->
	defaults = {
		parent     : '.box_game'
		el         : '#aladino'
		bgPosition : 'background-position'
		movements  : ['-27px 0px', '-54px 0px', '-81px 0px', '-108px 0px', '-135px 0px', '-162px 0px', '-189px 0px', '-216px 0px']
	}
	st = {}
	dom = {}

	catchDom = () ->
		dom.parent = $(st.parent)
		dom.el     = $(st.el, dom.parent)
		return
	suscribeEvents = () ->
		dom.el.on "click",   events.camelCase
		return

	events = {
		camelCase : (e) ->
			console.log(e)
			return
	}
	fn = {
		animate : () ->
			for i in st.movements
				console.log st.movements[i]
				dom.el.css(st.bgPosition, st.movements[i])
			return
	}
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom()
		suscribeEvents()
		window.animar = fn.animate()
		return

	return {
		init: initialize
	}
,[""]