###
Realiza la validación con parsleyjs.org
@class parsleyValidation
@main default/all
@author Ana Reyna
###
yOSON.AppCore.addModule "parsleyValidation", (Sb) ->
	dom = {}
	st =
		form : "form"
		frmAffiliate : "#frmAffiliate"
		btn : "#frmAffiliate .button"
		parsleyErrorsList : ".parsley-errors-list"
		body : "body"

	catchDom = ->
		dom.form = $(st.form)
		dom.frmAffiliate = $(st.frmAffiliate)
		dom.btn = $(st.btn)
		dom.parsleyErrorsList = $(st.parsleyErrorsList)
		dom.body = $(st.body)
		return
	suscribeEvents = ->
        dom.body.on 'keyup click', functions.removeUnactive
        #dom.btn.on 'click', functions.callValidateSelect
        return
	functions = 
		validate: ->
			window.ParsleyValidator.setLocale('es')
			return
		marginErrorList: ->
			dom.parsleyErrorsList.each( (i, item) ->
				$this = $(item)
				width = $this.prev().width() + 12
				left = $this.prev().position().left + 2
				$this.css(
					'margin': "0 0 0 #{left}px"
					"max-width": width
				)
				return
			)
			return
		removeUnactive: ->
			if dom.frmAffiliate.length
				if dom.frmAffiliate.parsley().isValid()
					dom.btn.removeClass('unactive')
				else
					dom.btn.addClass('unactive')
			return
		callValidateSelect: ->
			Sb.trigger('validateSelect')
			return

	initialize = (oP) ->
		$(document).ready( () ->
			$.extend st, oP
			catchDom()
			suscribeEvents()
			functions.validate()
			functions.marginErrorList()
			return
		)

	return {
		init: initialize
	}

, ['js/dist/libs/parsleyjs/dist/parsley.min.js', 'js/dist/libs/parsleyjs/src/i18n/es.js']
