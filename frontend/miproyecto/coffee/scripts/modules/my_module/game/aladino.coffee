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
		movements  : [
					  '0px 0px', '-27px 0px', '-54px 0px', '-81px 0px', '-108px 0px', '-135px 0px', 
					  '-162px 0px', '-189px 0px', '-216px 0px', '-246px 0px', '-276px 0px'
					  '-300px 0px', '-330px 0px', '-360px 0px'
					 ]
		trace : ''
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

			for movement in st.movements
				st.trace +=  movement + ', ';
				dom.el.css(st.bgPosition, movement)
				console.log st.trace
			return
		toAnimate : (position) ->
			dom.el.css(st.bgPosition, st.movements[position])
			return
	}
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom()
		suscribeEvents()
		fn.animate()
		window.toAnimate = fn.toAnimate
		return

	return {
		init: initialize
	}
,[]