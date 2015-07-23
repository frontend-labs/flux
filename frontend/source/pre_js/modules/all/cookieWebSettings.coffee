###
Administra las configuraciones de la web por medio de Cookies
@class cookieWebSettings
@main aptitusnew/all
###
yOSON.AppCore.addModule "cookieWebSettings", (Sb) ->
	cookieData =
		font_size: 14
	cookieName = 'web_settings'
	st = {}

	functions = 
		createCookie : () ->
			if Cookie.read(cookieName) == null
				Cookie.create(cookieName, JSON.stringify(cookieData))		
			return

		openCookie : (callback) ->
			currentCookieData = JSON.parse(Cookie.read(cookieName))
			callback.call(this, currentCookieData)
			return 

		updateCookie : (newData) ->
			Cookie.create(cookieName, JSON.stringify(newData))
			return

		updateFromCookie : (key, data) ->
			currentCookieData = JSON.parse(Cookie.read(cookieName))
			currentCookieData[key] = data
			functions.updateCookie(currentCookieData)
			console.log("holaaa")
			return

	initialize = (oP) ->
		$(document).ready( () ->
			$.extend st, oP
			functions.createCookie()
			Sb.events(["openCookie"], functions.openCookie, this)
			Sb.events(["updateCookie"], functions.updateCookie, this)
			Sb.events(["updateFromCookie"], functions.updateFromCookie, this)
			return
		)

	return {
		init: initialize
	}


