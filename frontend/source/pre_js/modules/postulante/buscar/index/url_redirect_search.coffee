###*
Modulo para la construcción de la URL a buscar en la busqueda
@class url_redirect_search
@main postulante
@author Carlos Huamani
###
yOSON.AppCore.addModule "url_redirect_search", (Sb) ->
	st =
		frmSearch		: '#frmSearchPage'
		btn_search 		: '.btn_search'
		txtSearch		: '.txt_search'
		containetOptions: '.filter_bar'
		options			: '.checkN:checked'
		section			: '.filters'		
		skeleton		: {}
	dom = {}

	catchDom = ->
		dom.frmSearch		= $(st.frmSearch)
		dom.btnSearch		= $(st.btnSearch, dom.fmrSearch)
		dom.txtSearch		= $(st.txtSearch, dom.fmrSearch)
		dom.containetOptions= $(st.containetOptions)
		dom.options			= $(st.options, dom.containetOptions)
		dom.section			= $(st.section, dom.containetOptions)
		return

	suscribeEvents = ->
		dom.frmSearch.on 'submit', events.eSearch
		return

	events =
		eSearch : (e) ->
			#Detiene la ejecucion de posibles eventos secundarios
			e.preventDefault()
			e.stopImmediatePropagation()
			#Crea el esqueleto del objeto
			skeleton = fn.createSqueleton(dom.section)
			#Agrega valores al esqueleto
			structure = fn.buildStructure(skeleton, $(st.options))
			#Limpia el texto de busqueda
			searchText = fn.cleanText(dom.txtSearch.val())
			#Genera los cimientos de la url
			baseUrl = fn.createBaseURL(yOSON.baseHost, searchText)
			#Crea la URL final
			urlGenerated = fn.createFinalUrl(structure, baseUrl)
			#Redirecciona acorde a la url generada
			window.location = urlGenerated
			return
	fn =
		createSqueleton: (sections)->
			skeleton = {}
			sections.each () ->
				key = $(@).data('key')
				skeleton[key] = [] 
				return
			return skeleton

		buildStructure: (skeleton, options) ->
			options.each ->
				key = $(@).closest(st.section).data('key')
				value = $(@).data('value')
				skeleton[key].push(value)
				
				return
			return skeleton

		createBaseURL: (host, searchText) ->
			searchURL = ''
			if searchText != ''
				searchURL = "q/#{searchText}/"
			return "#{host}/buscar/#{searchURL}"

		createFinalUrl: (structure, url)->			
			$.each structure, (id, val)->
				if val.length > 0
					url += "#{id}/#{val.join('--')}/"
				return
			return url

		cleanText : (searchText) ->
			value = $.trim(searchText)
			if value != ''
				value = value.replace(/-+/g, ' ')
				value = value.replace(/_+/g, ' ')
				value = value.replace(/\.+/g, '')
				value = value.replace(/\s/g, '+')
				value = value.replace(/,+/g, '')
				value = value.replace(/\%+/g, ' ')
			return value
	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		suscribeEvents()	
		Sb.events(["fnRedirectUrl"], events.eSearch, @)
		return

	return {
		init : initialize
		tests : fn
	}
, []