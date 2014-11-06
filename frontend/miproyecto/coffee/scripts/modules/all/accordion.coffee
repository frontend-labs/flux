###
Permite crear un accordion
@class accordion
@main pagoefectivomovil/all
@author Luis Natividad
###
yOSON.AppCore.addModule "accordion", (Sb) ->
	dom = {}
	st =
		accordion 		: ".accordion"
		container 		: ".container"
		accordion_icon : ".accordion span"
	catchDom = ->
		dom.accordion = $(st.accordion)
		dom.container = $(st.container)
		dom.accordion_icon = $(st.accordion_icon)
		return
	suscribeEvents = ->
		dom.accordion.on 'click', functions.open
		$('head').append("<meta name='viewport' content='width=device-width, user-scalable=no'>")
		return
	functions = 
		open: (e) ->
			_this = $(this)
			if _this.next(st.container).is ":visible"
				_this.next(st.container).hide(500)
				_this.children("span").html "+" 
			else
				dom.container.hide()
				dom.accordion_icon.html "+"
				_this.next(st.container).show "slow"
				_this.children("span").html "-"
			return
	initialize = (oP) ->
		$(document).ready( () ->
			$.extend st, oP
			catchDom()
			suscribeEvents()
			return
		)

	return {
		init: initialize
	}


