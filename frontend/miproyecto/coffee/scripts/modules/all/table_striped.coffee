###
Se da estilo striped a las tablas
@class tableStriped
@main pagoefectivomovil/all
@author Luis Natividad
###
yOSON.AppCore.addModule "tableStriped", (Sb) ->
	dom = {}
	st =
		table : ".table tbody tr:nth-child(2n+1)"
	catchDom = ->
		dom.table = $(st.table)
		return
	functions = 
		tableStriped: ->
			dom.table.addClass('odd')
			return

	initialize = (oP) ->
		$(document).ready( () ->
			$.extend st, oP
			catchDom()
			functions.tableStriped()
			return
		)

	return {
		init: initialize
	}


