###
Modulo para crear los metodos de animacion de aladino
@class aladino
@main my_module/game
@author 
###

yOSON.AppCore.addModule "aladino", (Sb) ->
	defaults = {
		parent      : '.box_game'
		el          : '.aladino'
		bgPosition  : 'background-position'
		movements   : [4,11]
		trace       : '',
		indice      : 0,
		prefixClass : 'running_',
		time        : 120
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
		run : () ->
			classRemove = ''
			classAdd = ''
			st.indice = st.movements[0]
			setInterval( () ->
				if st.indice is st.movements[1]
					st.indice = st.movements[0]
					classRemove = st.prefixClass + st.movements[1]
				else
					classRemove = st.prefixClass + st.indice
				classAdd = st.prefixClass + (st.indice + 1)
				dom.el.removeClass(classRemove).addClass(classAdd)
				st.indice++
				console.log st.prefixClass + st.indice
			, st.time)
			return
	}

	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom()
		suscribeEvents()
		fn.run()
		return

	return {
		init: initialize
	}
,[]