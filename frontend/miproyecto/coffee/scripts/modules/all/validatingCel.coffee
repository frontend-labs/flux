###
Validando celular
@class validatingCel
@main pagoefectivomovil/all
@author Paúl Díaz
###
yOSON.AppCore.addModule "validatingCel", (Sb) ->

	celBloqueado = "987654321"
	celMomo = "123456789"
	operatorMomo = "1"
	
	st =
		txtCel : "#xMovil"
		momoPin : "#momoPin"
		selectOperator : "#iOperador"
		pin : "#xPin"

		pagoefectivoAlreadyRegister : "#pagoefectivoAlreadyRegister"
		changePersonalData : "#changePersonalData"

		selectDni : "#iTipoDocumento"
		txtDni : "#xDocumento"
		txtExpiry : "#xCaducidad"
		txtName : "#xNombres"
		txtSurnamePat : "#xApePaterno"
		txtSurnameMat : "#xApeMaterno"
		txtEmail : "#xEmail"
		chkTerms : "#lPolitica"
		chkMarketing : "#lPolitica"

		btnLogIn : "#btnLogIn"
		btnStep01 : "#btnStep01"
		blocked : "#blocked"

	dom = {}
	catchDom = ->
		dom.txtCel = $(st.txtCel)
		dom.momoPin = $(st.momoPin)
		dom.selectOperator = $(st.selectOperator)
		dom.pin = $(st.pin)

		dom.pagoefectivoAlreadyRegister = $(st.pagoefectivoAlreadyRegister)
		dom.changePersonalData = $(st.changePersonalData)

		dom.selectDni = $(st.selectDni)
		dom.txtDni = $(st.txtDni)
		dom.txtExpiry = $(st.txtExpiry)
		dom.txtName = $(st.txtName)
		dom.txtSurnamePat = $(st.txtSurnamePat)
		dom.txtSurnameMat = $(st.txtSurnameMat)
		dom.txtEmail = $(st.txtEmail)
		dom.chkTerms = $(st.chkTerms)
		dom.chkMarketing = $(st.chkMarketing)

		dom.btnLogIn = $(st.btnLogIn)
		dom.btnStep01 = $(st.btnStep01)
		dom.blocked = $(st.blocked)
		return
	suscribeEvents = ->
		dom.txtCel.on 'focusout', functions.validatingCel
		return
	functions = 
		validatingCel : ->
			blocked = [dom.selectOperator, dom.selectDni, dom.txtDni, dom.txtName, dom.txtSurnamePat, dom.txtSurnameMat, dom.txtEmail]
			

			if dom.blocked.length
				number = $(@).val()
				if number is celBloqueado
					dom.blocked.fadeIn()

			if dom.momoPin.length
				number = $(@).val()
				#operator = dom.selectOperator.find('option:selected').val()
				#if operator is operatorMomo and number is celMomo
				if number is celMomo
					dom.momoPin.slideDown()
					dom.pin.attr("required", "").parsley()
					dom.pagoefectivoAlreadyRegister.slideDown()
					dom.changePersonalData.slideDown()
					functions.disabledInput(blocked, true)
					
				else
					dom.momoPin.slideUp()
					dom.pin.removeAttr("required").removeClass("parsley-error").parsley().destroy()
					dom.pagoefectivoAlreadyRegister.slideUp()
					dom.changePersonalData.slideUp()
					functions.disabledInput(blocked, false)

				Sb.trigger('disabledSelect')
				Sb.trigger('callEqualingHeights')
			return
		disabledInput: (array, disabled) ->
			values = [1, 1, 46737335, "Paúl", "Díaz", "Navarrete", 0]
			clean = [0, 1, "", "", "", "", "", ""]
			if disabled
				$.each(array, (i, item) ->
					if values[i] isnt 0
						item.val(values[i]).prop('disabled', disabled).addClass('disabled').trigger('blur')
					return
				)
			else
				$.each(array, (i, item) ->
					item.val(clean[i]).prop('disabled', disabled).removeClass('disabled')
					return
				)
			Sb.trigger('disabledSelect')
			return

	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		suscribeEvents()

		return

	return {
		init: initialize
	}