###
Se da estilo striped a las tablas
@class table_striped
@main flux/all
@author Luis Natividad
###
yOSON.AppCore.addModule "table_striped", (Sb) ->
	dom = {}

	st =
		table : ".table tbody tr:nth-child(2n+1)"

	catchDom = ->
		dom.table = $(st.table)
		return

	fn =
		tableStriped: ->
			dom.table.addClass("odd")
			return

	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		fn.tableStriped()
		return

	return {
		init: initialize
	}


