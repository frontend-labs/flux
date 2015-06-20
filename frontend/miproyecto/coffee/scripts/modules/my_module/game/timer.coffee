###
Modulo para contar los segundos transcurridos desde que aladino comenzo a correr
@class timer
@main my_module/game
@author 
###

yOSON.AppCore.addModule "timer", (Sb) ->
	defaults = {
		parent       : '.box_game'
		el           : '.timer'
		time         : 1000
		elapsed_time : 0
		timeInterval :0
	}
	st = {}
	dom = {}
	interval = null

	catchDom = () ->
		dom.parent = $(st.parent)
		dom.el     = $(st.el, dom.parent)
		return
	suscribeEvents = () ->
		return

	events = {
	}

	fn = {
		start : () ->
			st.timeInterval = (st.time/st.time)
			interval = setInterval( () ->
					st.elapsed_time = st.elapsed_time + st.timeInterval
					fn.showTime(st.elapsed_time)
				, st.time)
			return
		showTime : (currentTime) ->
			dom.el.html(currentTime)
			return
	}

	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom()
		suscribeEvents()
		fn.start()
		return

	return {
		init: initialize
	}
,[]