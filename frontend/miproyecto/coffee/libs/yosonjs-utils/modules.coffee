yOSON.AppSchema.modules =
	"mimodulo":
		"controllers":
			"Home":
				"allActions": () ->
					return
				"actions":
					"Index": () ->
						log 'Home/Index'
						return
					"About": () ->
						log 'Home/About'
						return
					"Contact": () ->
						log 'Home/Contact'
						return
					"byDefault": () ->
						return
			"Account":
				"allActions": () ->
					return
				"actions":
					"Login": () ->
						yOSON.AppCore.runModule "forgotPin"
						return
					"byDefault": () ->
						return
			"Afiliacion":
				"allActions": () ->
					return
				"actions":
					"AfiliacionPaso1": () ->
						yOSON.AppCore.runModule "expiry"
						return
					"AfiliacionPaso3": () ->
						yOSON.AppCore.runModule "countdown"
						return
					"byDefault": () ->
						return
			"peMovil":
				"allActions": () ->
					return
				"actions":
					"AfiliacionBienvenido": () ->
						log("menuInteraction")
						yOSON.AppCore.runModule "menuInteraction"
						return
					"SaldosyMovimientos": () ->
						yOSON.AppCore.runModule "nanoScroll"
						return
					"byDefault": () ->
						return
			"byDefault": () ->
				return
		"byDefault": () ->
			return
		"allControllers": () ->
			return
	"byDefault": () ->
		return
	"allModules": () ->
		yOSON.AppCore.runModule "select"
		yOSON.AppCore.runModule "validatingCel"
		yOSON.AppCore.runModule "makeNumericKeypad"
		yOSON.AppCore.runModule "verticalAlignMiddle"
		yOSON.AppCore.runModule "delegateWidthButtons"
		yOSON.AppCore.runModule "equalingHeights"
		yOSON.AppCore.runModule "picker"
		yOSON.AppCore.runModule "callFancybox"
		yOSON.AppCore.runModule "parsleyValidation"
		yOSON.AppCore.runModule "tableStriped"
		yOSON.AppCore.runModule "accordion"
		yOSON.AppCore.runModule "addMsie"
		yOSON.AppCore.runModule "initAttrChange"
		yOSON.AppCore.runModule "reloadSelectivizr"
		return